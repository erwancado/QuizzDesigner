<?php

namespace App\Controller;

use App\Entity\Partie;
use App\Entity\Quiz;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    /**
     * @Route("/game/{id}", name="game")
     */
    public function index($id)
    {
        $quizz=$this->getDoctrine()->getRepository(Quiz::class)->find($id);
        $user=$this->getUser()->getUsername();
        $user=$this->getDoctrine()->getRepository(User::class)->findOneBy(array('email'=>$user));
        $partie=$this->getDoctrine()->getRepository(Partie::class)->findOneBy(array('quiz'=>$quizz,'user'=>$user,'Etat'=>0));
        if($partie==null){
            $partie=new Partie();
            $partie->setUser($user);
            $partie->setQuiz($quizz);
        }

        return $this->render('game/index.html.twig', [
            'controller_name' => 'GameController',
            'quizz' => $quizz
        ]);
    }
}
