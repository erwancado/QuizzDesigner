<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PartieRepository")
 */
class Partie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $Etat;

    /**
     * @ORM\Column(type="integer")
     */
    private $Score;

    /**
     * @ORM\Column(type="date")
     */
    private $Date;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="parties")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Quiz", inversedBy="parties")
     * @ORM\JoinColumn(nullable=false)
     */
    private $quiz;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Question")
     */
    private $question_in_progress;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Question")
     */
    private $questions_done;

    public function __construct()
    {
        $this->questions_done = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEtat(): ?int
    {
        return $this->Etat;
    }

    public function setEtat(int $Etat): self
    {
        $this->Etat = $Etat;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->Score;
    }

    public function setScore(int $Score): self
    {
        $this->Score = $Score;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->Date;
    }

    public function setDate(\DateTimeInterface $Date): self
    {
        $this->Date = $Date;

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

    public function getQuiz(): ?Quiz
    {
        return $this->quiz;
    }

    public function setQuiz(?Quiz $quiz): self
    {
        $this->quiz = $quiz;

        return $this;
    }

    public function getQuestionInProgress(): ?Question
    {
        return $this->question_in_progress;
    }

    public function setQuestionInProgress(?Question $question_in_progress): self
    {
        $this->question_in_progress = $question_in_progress;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestionsDone(): Collection
    {
        return $this->questions_done;
    }

    public function addQuestionsDone(Question $questionsDone): self
    {
        if (!$this->questions_done->contains($questionsDone)) {
            $this->questions_done[] = $questionsDone;
        }

        return $this;
    }

    public function removeQuestionsDone(Question $questionsDone): self
    {
        if ($this->questions_done->contains($questionsDone)) {
            $this->questions_done->removeElement($questionsDone);
        }

        return $this;
    }
}
