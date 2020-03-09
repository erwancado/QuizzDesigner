<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $userAdmin = new User();
        $userAdmin->setEmail("admin@quizzDesigner.com");
        $userAdmin->setPassword("admin");
        $userAdmin->setRoles(["ROLE_ADMIN"]);
        $userAdmin->setNom("Admin");
        $userAdmin->setPrenom("Admin");

        $user = new User();
        $user->setEmail("user@quizzDesigner.com");
        $user->setPassword("user");
        $user->setRoles(["ROLE_USER"]);
        $user->setNom("User");
        $user->setPrenom("User");

        $manager->persist($userAdmin);
        $manager->persist($user);
        $manager->flush();
    }
}
