<?php

namespace App\Controller;

use App\Entity\Theme;
use App\Form\AddThemeFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AddThemeController extends AbstractController
{
    /**
     * @Route("/add/theme", name="add_theme")
     */
    public function index(Request $request)
    {
        $theme = new Theme();
        $theme->setUserId($this->getUser());

        $form = $this->createForm(AddThemeFormType::class, $theme);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $new = $form->getData();
            $themeList = $this->getDoctrine()->getRepository(Theme::class)->findAll();

            foreach ($themeList as $t){
                if ($t->getNom() == $new->getNom()){
                    $this->addFlash('error', 'Theme "'.$new->getNom().'" already exist !');
                    return $this->redirectToRoute('add_theme');
                }

            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($theme);
            $entityManager->flush();

            $this->addFlash('succes', 'Theme '.$new->getNom().' added succesfully !');

            return $this->redirectToRoute('admin_dash_board');
        }

        return $this->render('add_theme/index.html.twig', [
            'controller_name' => 'AddThemeController',
            'addThemeForm' => $form->createView(),
        ]);
    }

}