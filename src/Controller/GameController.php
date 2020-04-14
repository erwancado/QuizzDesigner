<?php

namespace App\Controller;

use App\Entity\Partie;
use App\Entity\Quiz;
use App\Entity\Reponse;
use App\Entity\User;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    /**
     * @Route("/game/{id}", name="game")
     * @param $id
     * @return Response
     * @throws Exception
     */
    public function index($id)
    {
        $request=Request::createFromGlobals();
        $entitymanager=$this->getDoctrine()->getManager();
        $quizz=$this->getDoctrine()->getRepository(Quiz::class)->find($id);
        $user=$this->getUser()->getUsername();
        $user=$this->getDoctrine()->getRepository(User::class)->findOneBy(array('email'=>$user));
        $partie=$this->getDoctrine()->getRepository(Partie::class)->findOneBy(array('quiz'=>$quizz,'user'=>$user,'Etat'=>0));
        $questions=$quizz->getQuestions();
        $nb_points_quizz=0;
        $nb_bonnes_reponses=0;
        $points=array();
        foreach ($questions as $q){
            $nb_points_quizz+=$q->getNbPoints();
        }
        if($partie==null){
            $partie=new Partie();
            $partie->setUser($user);
            $partie->setQuiz($quizz);
            $partie->setScore(0);
            $partie->setEtat(0);
            $nb_questions_restantes=$questions->count();
            $questions=$questions->toArray();
            if(!$quizz->getEstOrdonne())
                shuffle($questions);
            $partie->setQuestionInProgress(array_values($questions)[0]);
        }
        else{
            foreach ($partie->getQuestionsDone() as $q){
                $questions->removeElement($q);
            }
            $nb_questions_restantes=$questions->count();
            $questions=$questions->toArray();
            if(!$quizz->getEstOrdonne())
                shuffle($questions);
        }
        $question=$partie->getQuestionInProgress();
        $form=$this->createFormBuilder();
        if($question->getType()=="QCM"){
            $form=$this->createFormBuilder();
            for ($i=0;$i<$question->getReponses()->count();$i++){
                $reponse=$question->getReponses()->toArray()[$i];
                array_push($points,$reponse->getNbPoints());
                if($reponse->getNbPoints()!=0)
                    $nb_bonnes_reponses++;
                $form->add('QCMreponse'.$i, CheckboxType::class, [
                    'label'    => $reponse->getLibelle(),
                    'required' => false,
                    'value' => $reponse->getId(),
                    'label_attr'=>['class'=>'checkbox-custom']
                ]);
            }
        }
        else{
            $form->add('reponse',TextType::class,['help'=>$question->getAide()]);
        }

        $form->add('suivant', SubmitType::class,[
            'disabled'=>true,
            'attr'=>['class'=>'validation']
        ]);
        $form = $form->getForm();
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $submit=$form->getData();
            $score_question=0;
            if($question->getType()=="QCM"){
                for($i=0;$i<$question->getReponses()->count();$i++){
                    if($submit['QCMreponse'.$i]==true){
                        $reponse=$question->getReponses()->get($i);
                        $score_question+=$reponse->getNbPoints();
                    }
                }
            }
            else{
                $reponse=$question->getReponses()->first();
                if($this->transform_string(array_values($submit)[0])==$this->transform_string($reponse->getLibelle())){
                    $score_question=$reponse->getNbPoints();
                }
            }
            $partie->setScore($partie->getScore()+$score_question);
            $partie->setDate(new \DateTime('now'));
            if(count($questions)>1)
            {
                $partie->setQuestionInProgress(array_values($questions)[1]);
                $partie->addQuestionsDone($question);
                $entitymanager->persist($partie);
                $entitymanager->flush();
                return $this->redirectToRoute('game',['id'=>$quizz->getId()]);
            }
            else{
                $partie->setEtat(1);
                $partie->setQuestionInProgress(null);
                foreach ($partie->getQuestionsDone() as $q){
                    $partie->removeQuestionsDone($q);
                }
                $entitymanager->persist($partie);
                $entitymanager->flush();
                return $this ->render('game/end.html.twig',[
                    'controller_name' => 'GameController',
                    'quizz' => $quizz,
                    'partie'=>$partie,
                    'nb_points_quizz'=>$nb_points_quizz,
                ]);
            }
        }
        return $this->render('game/index.html.twig', [
            'controller_name' => 'GameController',
            'quizz' => $quizz,
            'question'=> $partie->getQuestionInProgress(),
            'partie'=>$partie,
            'nb_points_quizz'=>$nb_points_quizz,
            'nb_questions_restantes'=>$nb_questions_restantes,
            'nb_reponses'=>$nb_bonnes_reponses,
            'points'=>$points,
            'form'=>$form->createView()
        ]);
    }
    private function transform_string($str){
        $str=strtolower($str);
        setlocale(LC_ALL, "en_US.utf8");
        $str = iconv("utf-8", "ascii//TRANSLIT", $str);
        return $str;
    }
}
