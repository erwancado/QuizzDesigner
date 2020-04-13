<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Quiz;
use App\Entity\Reponse;
use App\Entity\Theme;
use App\Entity\User;
use phpDocumentor\Reflection\Types\Array_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

class CreateQuizzPageController extends AbstractController
{
    /**
     * @Route("/create/quizz/page", name="create_quizz_page")
     */
    public function index(UploaderHelper $helper)
    {
        $themeList = $this->getDoctrine()->getRepository(Theme::class)->findAll();
        $entitymanager=$this->getDoctrine()->getManager();
        $request=Request::createFromGlobals();
        if($this->getValue($request,"QuestionText1")!="null"){
            $iQuestion=1;
            $quizz=new Quiz();
            $quizz->setNom($this->getValue($request,"QuizzTitle"));
            $isOrdered=$this->getValue($request,"QuizzOrdered")=="true";
            $quizz->setEstOrdonne($isOrdered);
            $idTheme=$this->getValue($request,"theme_list");
            $theme=$this->getDoctrine()->getRepository(Theme::class)->find($idTheme);
            $quizz->setTheme($theme);
            $user=$this->getUser()->getUsername();
            $user=$this->getDoctrine()->getRepository(User::class)->findOneBy(array('email'=>$user));
            $quizz->setUser($user);
            $quizz->setUpdatedAt(new \DateTime("now"));
            $quizz->setDifficulte((int)$this->getValue($request, "QuizzDifficulty"));

            if ($request->files->get("customQuizImage") !== null){
                $quizz->setImgFile($request->files->get('customQuizImage'));
            }

            $user->addQuiz($quizz);
            while (($text=$this->getValue($request,"QuestionText".$iQuestion))!="null"){
                $question=new Question();
                $question->setLibelle($text);
                $question->setAide($this->getValue($request,"QuestionHelp".$iQuestion));
                $question->setNbPoints((int)$this->getValue($request,"QuestionDifficulty".$iQuestion));

                if ($request->files->get("customFile".$iQuestion, "null") != "null"){
                    $question->setImageFile($request->files->get("customFile".$iQuestion));
                }

                $isQCM=$this->getValue($request,"txt-Q".$iQuestion."-A1")!="null";
                if(!$isQCM){
                    $question->setType("Ouverte");
                    $reponseNonQCM=new Reponse();
                    $reponseNonQCM->setLibelle($this->getValue($request,"QuestionAnswer".$iQuestion));
                    $reponseNonQCM->setNbPoints($question->getNbPoints());
                    $reponseNonQCM->setQuestion($question);
                    $entitymanager->persist($reponseNonQCM);
                    $question->addReponse($reponseNonQCM);
                }
                else{
                    $question->setType("QCM");
                    $iReponse=1;
                    while (($textReponseQCM=$this->getValue($request,"txt-Q".$iQuestion."-A".$iReponse))!="null"){
                        $reponseQCM=new Reponse();
                        $reponseQCM->setLibelle($textReponseQCM);
                        $reponseQCM->setNbPoints((int)$this->getValue($request,"points-Q".$iQuestion."-A".$iReponse));
                        $reponseQCM->setQuestion($question);
                        $entitymanager->persist($reponseQCM);
                        $question->addReponse($reponseQCM);
                        $iReponse++;
                    }
                }
                $entitymanager->persist($question);
                $quizz->addQuestion($question);
                $iQuestion++;
            }
            $entitymanager->persist($quizz);
            $entitymanager->flush();
            $this->addFlash('succes', 'Quizz "'.$quizz->getNom().'" ajouté avec succés !');
            return $this->redirectToRoute('admin_dash_board', ['hide' => 'theme']);
        }
        return $this->render('create_quizz_page/index.html.twig', [
            'controller_name' => 'CreateQuizzPageController',
            'liste_themes' => $themeList
        ]);
    }

    private function getValue($request,$id){
        return $request->request->get($id,"null");
    }

}
