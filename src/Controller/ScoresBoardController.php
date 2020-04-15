<?php

namespace App\Controller;

use App\Entity\Partie;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ScoresBoardController extends AbstractController
{
    /**
     * @Route("/scores/board", name="scores_board")
     */
    public function index()
    {
        $user=$this->getUser()->getUsername();
        $user=$this->getDoctrine()->getRepository(User::class)->findOneBy(array('email'=>$user));
        $parties=$this->getDoctrine()->getRepository(Partie::class)->findBy(array('user'=>$user),array('Date'=>'DESC'));
        return $this->render('scores_board/index.html.twig', [
            'controller_name' => 'ScoresBoardController',
            'parties'=>$parties
        ]);
    }
}
