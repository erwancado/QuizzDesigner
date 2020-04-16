<?php

namespace App\Controller;

use App\Entity\Partie;
use App\Entity\Quiz;
use App\Entity\Theme;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomePageController extends AbstractController
{
    /**
     * @Route("/", name="home_page")
     */
    public function index()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $user = $this->getUser();
        $quizzList = $this->getDoctrine()->getRepository(Quiz::class)->findAll();
        $themes = $this->getDoctrine()->getRepository(Theme::class)->findAll();

        $themeList = array();
        foreach ($themes as $t){
            array_push($themeList, $t);
        }
        shuffle($themeList);

        while(sizeof($themeList) > 8){
            array_pop($themeList);
        }


        return $this->render('home_page/index.html.twig', [
            'controller_name' => 'HomePageController',
            'user' => $user,
            'quizzList' => $quizzList,
            'themeList' => $themeList
        ]);
    }
}
