<?php

namespace App\Controller;

use App\Entity\Quiz;
use App\Entity\Theme;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdminDashBoardController extends AbstractController
{


    /**
     * @Route("/admin/dashboard", name="admin_dash_board")
     */
    public function index(Request $request)
    {

        $user = $this->getUser();
        $quizzes = $user->getQuizzes();
        $themes = $user->getThemes();

        if($request->query->get('hide') != null)
            $hide = $request->query->get('hide');
        else
            $hide = "theme";

        return $this->render('admin_dash_board/index.html.twig', [
            'controller_name' => 'AdminDashBoardController',
            'quizzes' => $quizzes,
            'themes' => $themes,
            'quizTemplate' => 'admin_dash_board/quizTemplate.html.twig',
            'themeTemplate' => 'admin_dash_board/themeTemplate.html.twig',
            'hide' => $hide,
        ]);
    }

    /**
     * @Route("/admin/dashboard/delete/theme/{id}", name="delete_theme")
     */
    public function deleteTheme(string $id){

        $entityManager = $this->getDoctrine()->getManager();

        $theme = $this->getDoctrine()->getRepository(Theme::class)->find($id);

        if (!$theme) {
            throw $this->createNotFoundException(
                'No theme found for id '.$id
            );
        }

        $entityManager->remove($theme);
        $entityManager->flush();

        return $this->redirectToRoute('admin_dash_board', ['hide' => 'quizz']);

    }

    /**
     * @Route("/admin/dashboard/delete/quiz/{id}", name="delete_quiz")
     */
    public function deleteQuizz(string $id){

        $entityManager = $this->getDoctrine()->getManager();

        $quiz = $this->getDoctrine()->getRepository(Quiz::class)->find($id);

        if (!$quiz) {
            throw $this->createNotFoundException(
                'No Quiz found for id '.$id
            );
        }

        $entityManager->remove($quiz);
        $entityManager->flush();

        return $this->redirectToRoute('admin_dash_board', ['hide' => 'theme']);

    }
}
