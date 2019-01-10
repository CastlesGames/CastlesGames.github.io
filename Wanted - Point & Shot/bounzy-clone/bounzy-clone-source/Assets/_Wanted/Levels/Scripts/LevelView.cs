using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using MovementEffects;

public class LevelView : MonoBehaviour
{
    [SerializeField]
    Transform _levelUI;

    [SerializeField]
    Text _levelText;

    [SerializeField]
    Transform _randomPhrasesTransform;

    [SerializeField]
    List<Image> _waveListImages;

    [SerializeField]
    Transform _pauseButton;

    [SerializeField]
    Transform _pauseBackground;

    [SerializeField]
    Transform _pausePopUp;

    [SerializeField]
    Image _soundButtonImage;

    [SerializeField]
    Image _musicButtonImage;

    [SerializeField]
    Color _greenColor;

    [SerializeField]
    Color _redColor;

    [SerializeField]
    LevelController _levelController;

    public event System.Action OnPause;
    public event System.Action OnDesPause;
    public event System.Action OnContinue;
    public event System.Action OnEndTurn;
    public event System.Action OnGoToMenu;
    public event System.Action OnRestartLevel;
    public event System.Action OnClearLevel;

    private void Awake()
    {
        _levelController.OnInitialized += LevelController_OnInitialized;
        _levelController.OnUserTurn += LevelController_OnUserTurn;
        _levelController.OnVictory += LevelController_OnVictory;
        _levelController.OnGameOver += LevelController_OnGameOver;
    }

    private void OnDestroy()
    {
        _levelController.OnInitialized -= LevelController_OnInitialized; 
        _levelController.OnUserTurn -= LevelController_OnUserTurn;
        _levelController.OnVictory -= LevelController_OnVictory;
        _levelController.OnGameOver -= LevelController_OnGameOver;
    }

    private void LevelController_OnGameOver(int level, int currentWave)
    {
        _levelUI.gameObject.SetActive(false);
    }

    private void LevelController_OnVictory(int level, int currentWave)
    {
        _levelUI.gameObject.SetActive(false);
    }

    private void LevelController_OnInitialized(int level, int currentWave)
    {
        Initialized(level, currentWave);
    }

    private void LevelController_OnUserTurn(int currentWave)
    {
        UpdateInfo(currentWave);
    }

    void Initialized(int level, int currentWave)
    {
        AudioController.Instance.PlayGameMusic();

        _levelUI.gameObject.SetActive(true);
        _levelText.text = (level+1).ToString();
        _levelText.transform.DOScale(1.2f,0.1f).OnComplete(() => {
            _levelText.transform.DOScale(1f, 0.1f);
        });
        foreach(Image image in _waveListImages)
        {
            image.color = Color.black;
        }
        _pauseButton.gameObject.SetActive(false);
        AnimationImageWave(currentWave -1);

        if (AudioController.Instance.IsMusicOn)
        {
            _musicButtonImage.color = _greenColor;
        }
        else
        {
            _musicButtonImage.color = _redColor;
        }

        if (AudioController.Instance.IsSoundOn)
        {
            _soundButtonImage.color = _greenColor;
        }
        else
        {
            _soundButtonImage.color = _redColor;
        }
    }

    void UpdateInfo(int currentWave)
    {
        AnimationImageWave(currentWave - 1);
    }

    private void SetRandomPhrase(){
        _randomPhrasesTransform.gameObject.SetActive(true);
        _randomPhrasesTransform.localScale = new Vector3(0f, 1f, 1f);

        _randomPhrasesTransform.DOScaleX(1f, 0.15f).OnComplete(() => {
            Timing.RunCoroutine(DesactivateRandomPhrase(1f));
        });
    }

    IEnumerator<float> DesactivateRandomPhrase(float time)
    {
        yield return Timing.WaitForSeconds(time);
        _randomPhrasesTransform.DOScaleX(0f, 0.15f).OnComplete(() => {
            _randomPhrasesTransform.gameObject.SetActive(false);
            _pauseButton.gameObject.SetActive(true);
        });
    }

    private void AnimationImageWave(int index){
        if(index < _waveListImages.Count){
            _waveListImages[index].color = Color.white;
            _waveListImages[index].transform.DOScaleX(1.5f, 0.1f).OnComplete(() => {
                _waveListImages[index].transform.DOScaleX(1f, 0.1f);
            });
            _waveListImages[index].transform.DOScaleY(2f, 0.1f).OnComplete(() => {
                _waveListImages[index].transform.DOScaleY(1f, 0.1f);
                if (index == 0) SetRandomPhrase();
            });
        }
    }

    public void Pause(){
        AudioController.Instance.PlayButtonSound();
        _pauseBackground.gameObject.SetActive(true);

        _pausePopUp.localScale = Vector3.zero;
        _pausePopUp.DOScale(1f,0.5f).OnComplete(() => {
            if (OnPause != null) OnPause();
        });
    }

    public void Continue(){
        AudioController.Instance.PlayButtonSound();
        if (OnDesPause != null) OnDesPause();

        _pausePopUp.DOScale(0f, 0.5f).OnComplete(() => {
            if (OnContinue != null) OnContinue();
            _pauseBackground.gameObject.SetActive(false);
        });
    }

    public void EndTurn()
    {
        AudioController.Instance.PlayButtonSound();
        if (OnEndTurn != null) OnEndTurn();
    }

    public void GoToMenu()
    {
        AudioController.Instance.PlayButtonSound();
        if (OnGoToMenu != null) OnGoToMenu();
        if (OnDesPause != null) OnDesPause();
        _pauseBackground.gameObject.SetActive(false);
        _levelUI.gameObject.SetActive(false);
    }

    public void Sound()
    {
        AudioController.Instance.PlayButtonSound();
        if (AudioController.Instance.IsSoundOn)
        {
            _soundButtonImage.color = _redColor;
            AudioController.Instance.SwitchSound();
        }
        else
        {
            _soundButtonImage.color = _greenColor;
            AudioController.Instance.SwitchSound();
        }
    }

    public void Music()
    {
        AudioController.Instance.PlayButtonSound();
        if (AudioController.Instance.IsMusicOn)
        {
            _musicButtonImage.color = _redColor;
            AudioController.Instance.SwitchMusic();
        }
        else
        {
            _musicButtonImage.color = _greenColor;
            AudioController.Instance.SwitchMusic();
        }
    }

    public void Restart()
    {
        AudioController.Instance.PlayButtonSound();
        if (OnClearLevel != null) OnClearLevel();
        if (OnRestartLevel != null) OnRestartLevel();
        if (OnDesPause != null) OnDesPause();
        _pauseBackground.gameObject.SetActive(false);
    }
}
