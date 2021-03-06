<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints\DateTime;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="App\Repository\QuizRepository")
 * @Vich\Uploadable()
 */
class Quiz implements \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var File|null
     * @Vich\UploadableField( mapping="quizzes", fileNameProperty="filename")
     */
    private $imgFile;

    /**
     * @var string|null
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $filename;


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
     * @ORM\ManyToMany(targetEntity="App\Entity\Question", inversedBy="quizzes", cascade={"remove"})
     */
    private $questions;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updated_at;

    public function __construct()
    {
        $this->parties = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->updated_at = new DateTime('now');
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

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(?string $filename): self
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * @return File|null
     */
    public function getImgFile(): ?File
    {
        return $this->imgFile;
    }

    /**
     * @param File|UploadedFile|null $imgFile
     * @return Quiz
     * @throws Exception
     */
    public function setImgFile(?File $imgFile): Quiz
    {
        $this->imgFile = $imgFile;
        if ($this->imgFile instanceof UploadedFile){
            $this->updated_at = new \DateTime('now');
        }
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function serialize()
    {
        return serialize($this->id);
    }

    public function unserialize($serialized)
    {
        $this->id = unserialize($serialized);

    }

    public function getNbPoints() : int {
        $nb_points=0;
        foreach ($this->getQuestions() as $q){
            $nb_points+=$q->getNbPoints();
        }
        return $nb_points;
    }

    public function getLastPartie(int $userID) : ?Partie{
        $parties = $this->getParties();
        $partie_found=false;

        $lastPartie = new Partie();
        foreach ($parties as $partie){
            if ($partie->getUser()->getId() == $userID){
                if ($partie->getDate() > $lastPartie->getDate()){
                    $lastPartie = $partie;
                    $partie_found=true;
                }
            }
        }
        if($partie_found)
            return $lastPartie;
        else
            return null;
    }

}
