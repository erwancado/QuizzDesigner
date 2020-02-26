<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CreateQuizzPageController extends AbstractController
{
    /**
     * @Route("/create/quizz/page", name="create_quizz_page")
     */
    public function index()
    {
        return $this->render('create_quizz_page/index.html.twig', [
            'controller_name' => 'CreateQuizzPageController',
        ]);
    }
}
