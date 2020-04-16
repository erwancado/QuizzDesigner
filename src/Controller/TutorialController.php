<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class TutorialController extends AbstractController
{
    /**
     * @Route("/tutorial", name="tutorial")
     */
    public function index()
    {
        return $this->render('tutorial/index.html.twig', [
            'controller_name' => 'TutorialController',
            'userTuto' => 'tutorial/userTuto.html.twig',
            'adminTuto' => 'tutorial/adminTuto.html.twig',
        ]);
    }
}
