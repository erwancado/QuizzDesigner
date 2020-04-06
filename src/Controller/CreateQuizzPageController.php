<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Quiz;
use App\Entity\Reponse;
use App\Entity\Theme;
use phpDocumentor\Reflection\Types\Array_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class CreateQuizzPageController extends AbstractController
{
    /**
     * @Route("/create/quizz/page", name="create_quizz_page")
     */
    public function index()
    {
        $themeList = $this->getDoctrine()->getRepository(Theme::class)->findAll();
        $request=Request::createFromGlobals();
        $i=1;
        $quizz=new Quiz();
        $quizz->setNom($this->getValue($request,"QuizzTitle"));
        $isOrdered=$this->getValue($request,"QuizzOrdered")=="true";
        $quizz->setEstOrdonne($isOrdered);
        while (($text=$this->getValue($request,"QuestionText".$i))!="null"){
            $question=new Question();
            $question->setLibelle($text);
            $question->setAide($this->getValue($request,"QuestionHelp".$i));
            $question->setNbPoints((int)$this->getValue($request,"QuestionDifficulty".$i));
            $isQCM=$this->getValue($request,"check-Q".$i."-A1")!="null";
            if(!$isQCM){
                $question->setType("Ouverte");
                $reponseNonQCM=new Reponse();
                $reponseNonQCM->setLibelle($this->getValue($request,"QuestionAnswer".$i));
                $reponseNonQCM->setNbPoints($question->getNbPoints());
                $reponseNonQCM->setQuestion($question);
                $question->addReponse($reponseNonQCM);
            }
            else{
                $question->setType("QCM");
            }
            $i++;
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
