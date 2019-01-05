using UnityEngine.UI;
using UnityEngine;
using DG.Tweening;

public class VictoryView : MonoBehaviour
{
    [SerializeField]
    Transform _victoryScreen;

    [SerializeField]
    Transform _victoryPopUp;

    [SerializeField]
    Transform _nextLevelButton;

    [SerializeField]
    Transform _menuButton;

    [SerializeField]
    Text _tileText;

    [SerializeField]
    Button _improveLifeButton;

    [SerializeField]
    Button _improveDamageButton;

    [SerializeField]
    Button _improveBulletsButton;

    [SerializeField]
    Text _improveLifeText;

    [SerializeField]
    Text _improveDamageText;

    [SerializeField]
    Text _improveBulletsText;

    [SerializeField]
    Transform _improveLifeImage;

    [SerializeField]
    Transform _improveDamageImage;

    [SerializeField]
    Transform _improveBulletsImage;

    [SerializeField]
    LevelController _levelController;

    [SerializeField]
    Player _player;

    public event System.Action OnNextLevel;

    void Awake()
    {
        _levelController.OnVictory += LevelController_OnVictory;
    }

    private void OnDestroy()
    {
        _levelController.OnVictory -= LevelController_OnVictory;
    }

    private void LevelController_OnVictory(int level, int currentWave){
        Initialized(level, currentWave);
    }

    void Initialized(int level, int currentWave)
    {
        _victoryScreen.gameObject.SetActive(true);
        _menuButton.gameObject.SetActive(false);
        _nextLevelButton.gameObject.SetActive(false);
        _victoryPopUp.localScale = Vector3.zero;
        _tileText.text = "";
        _improveBulletsButton.interactable = true;
        _improveLifeButton.interactable = true;
        _improveDamageButton.interactable = true;

        _victoryPopUp.DOScale(1f, 0.5f).OnComplete(() => {
            _tileText.text = "Victoria en el nivel " + (level+1);
            _improveLifeText.text = "¡Mejorar Vida!" +"\n" +"\n" + 
                "Vida: " + _player.Life + "+" + _player.IncrementLife;
            _improveDamageText.text = "¡Mejorar Daño!" + "\n" + "\n" +
                "Daño: " + _player.DamageBullet + "+" + _player.IncrementDamage;

            if (_player.IsMaxBullets())
            {
                _improveBulletsButton.interactable = false;
                _improveBulletsText.text = "¡No puedes mejorar más! Balas al máximo";
            }
            else
            {
                _improveBulletsButton.interactable = true;
                _improveBulletsText.text = "¡Mejorar Balas!" + "\n" + "\n" +
                "Balas: " + _player.Bullets + "+" + _player.IncrementBullets;
            }
        });
    }

    public void ImproveLife()
    {
        AudioController.Instance.PlayButtonSound();
        _improveLifeImage.DOShakeScale(0.3f).OnComplete(() => {

            _player.ImproveLife();

            _improveBulletsButton.interactable = false;
            _improveLifeButton.interactable = false;
            _improveDamageButton.interactable = false;

            _menuButton.gameObject.SetActive(true);
            _nextLevelButton.gameObject.SetActive(true);
        });
    }

    public void ImproveDamage()
    {
        AudioController.Instance.PlayButtonSound();
        _improveDamageImage.DOShakeScale(0.3f).OnComplete(() => {

            _player.ImproveDamage();

            _improveBulletsButton.interactable = false;
            _improveLifeButton.interactable = false;
            _improveDamageButton.interactable = false;

            _menuButton.gameObject.SetActive(true);
            _nextLevelButton.gameObject.SetActive(true);
        });
    }

    public void ImproveBullets()
    {
        AudioController.Instance.PlayButtonSound();
        _improveBulletsImage.DOShakeScale(0.3f).OnComplete(() => {

            _player.ImproveBullets();

            _improveBulletsButton.interactable = false;
            _improveLifeButton.interactable = false;
            _improveDamageButton.interactable = false;

            _menuButton.gameObject.SetActive(true);
            _nextLevelButton.gameObject.SetActive(true);
        });
    }

    public void NextLevel()
    {
        AudioController.Instance.PlayButtonSound();
        _victoryScreen.gameObject.SetActive(false);
        _victoryPopUp.DOScale(0f, 0.5f).OnComplete(() => {
            if (OnNextLevel != null) OnNextLevel(); 
        });
    }
}
