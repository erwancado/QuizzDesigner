<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\QuizRepository")
 */
class Quiz
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Nom;

    /**
     * @ORM\Column(type="integer")
     */
    private $Difficulte;

    /**
     * @ORM\Column(type="boolean")
     */
    private $est_Ordonne;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Partie", mappedBy="quiz")
     */
    private $parties;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="quizzes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Theme", inversedBy="quizzes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $theme;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Question", inversedBy="quizzes")
     */
    private $questions;

    public function __construct()
    {
        $this->parties = new ArrayCollection();
        $this->questions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getDifficulte(): ?int
    {
        return $this->Difficulte;
    }

    public function setDifficulte(int $Difficulte): self
    {
        $this->Difficulte = $Difficulte;

        return $this;
    }

    public function getEstOrdonne(): ?bool
    {
        return $this->est_Ordonne;
    }

    public function setEstOrdonne(bool $est_Ordonne): self
    {
        $this->est_Ordonne = $est_Ordonne;

        return $this;
    }

    /**
     * @return Collection|Partie[]
     */
    public function getParties(): Collection
    {
        return $this->parties;
    }

    public function addParty(Partie $party): self
    {
        if (!$this->parties->contains($party)) {
            $this->parties[] = $party;
            $party->setQuiz($this);
        }

        return $this;
    }

    public function removeParty(Partie $party): self
    {
        if ($this->parties->contains($party)) {
            $this->parties->removeElement($party);
            // set the owning side to null (unless already changed)
            if ($party->getQuiz() === $this) {
                $party->setQuiz(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getTheme(): ?Theme
    {
        return $this->theme;
    }

    public function setTheme(?Theme $theme): self
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->contains($question)) {
            $this->questions->removeElement($question);
        }

        return $this;
    }
}
