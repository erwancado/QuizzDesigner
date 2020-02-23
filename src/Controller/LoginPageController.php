<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LoginPageController extends AbstractController
{
    /**
     * @Route("/login/page", name="login_page")
     */
    public function index()
    {
        $this->getDoctrine()->getRepository();

        return $this->render('login_page/index.html.twig', [
            'controller_name' => 'LoginPageController',
        ]);
    }
}
