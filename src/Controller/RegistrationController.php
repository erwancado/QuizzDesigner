<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\LoginFormAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $authenticator): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $email = $form->get('email')->getData();
            $ConfirmedEmail = $form->get('ConfirmEmail')->getData();

            if ($email == $ConfirmedEmail){
                $password = $form->get('plainPassword')->getData();
                $ConfirmedPassword = $form->get('ConfirmPassword')->getData();

                if ($password == $ConfirmedPassword){
                    // encode the plain password
                    $user->setPassword(
                        $passwordEncoder->encodePassword(
                        $user,
                        $form->get('plainPassword')->getData()
                    )
                    );

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->persist($user);
                    $entityManager->flush();

                    // do anything else you need here, like send an email

                    return $guardHandler->authenticateUserAndHandleSuccess(
                        $user,
                        $request,
                        $authenticator,
                        'main' // firewall name in security.yaml
                    );
                }
                else{
                    $this->redirectToRoute("app_register");
                    echo '<script>alert("Le mot de passe ne correspond pas")</script>';
                }

            }
            else{
                $this->redirectToRoute("app_register");
                echo '<script>alert("L\'Email ne correspond pas")</script>';
            }

        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
            'controller_name' => 'app_register',
        ]);
    }
}
