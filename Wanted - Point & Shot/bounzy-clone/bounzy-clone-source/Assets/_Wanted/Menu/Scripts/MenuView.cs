using GameToolkit.Localization;
using UnityEngine;
using DG.Tweening;
using UnityEngine.UI;

public class MenuView : MonoBehaviour
{
    [SerializeField]
    RectTransform _background;

    [SerializeField]
    RectTransform _title;

    [SerializeField]
    RectTransform _menuPanel;

    [SerializeField]
    RectTransform _playButton;

    [SerializeField]
    RectTransform _rankingButton;

    [SerializeField]
    Image _fadeImage;

    [SerializeField]
    Text _levelText;

    [SerializeField]
    LevelView _levelView;

    [SerializeField]
    SettingsView _settingsView;

    [SerializeField]
    RecordsView _recordsView;

    [SerializeField]
    VictoryView _victoryView;

    [SerializeField]
    LevelManager _levelManager;

    public event System.Action OnPlay;
    public event System.Action OnRanking;
    public event System.Action OnSettings;

    private void Start()
    {
        InitialAnimation();
        _levelView.OnGoToMenu += LevelView_OnGoToMenu;
        _settingsView.OnClose += SettingsView_OnClose;
        _recordsView.OnClose += RecordsView_OnClose;
        _victoryView.OnGoToMenu += VictoryView_OnGoToMenu;
    }

    private void OnDestroy()
    {
        _levelView.OnGoToMenu -= LevelView_OnGoToMenu;
        _settingsView.OnClose -= SettingsView_OnClose;
        _recordsView.OnClose -= RecordsView_OnClose;
        _victoryView.OnGoToMenu -= VictoryView_OnGoToMenu;
    }

    private void LevelView_OnGoToMenu()
    {
        FadeAnimation(3);
    }

    private void SettingsView_OnClose()
    {
        FadeAnimation(3);
    }

    private void RecordsView_OnClose()
    {
        FadeAnimation(3);
    }

    void VictoryView_OnGoToMenu()
    {
        FadeAnimation(3);
    }

    public void Play()
    {
        AudioController.Instance.PlayButtonSound();
        FadeAnimation(0);
    }

    public void Ranking()
    {
        AudioController.Instance.PlayButtonSound();
        FadeAnimation(1);
    }

    public void Settings()
    {
        AudioController.Instance.PlayButtonSound();
        FadeAnimation(2);
    }

    public void Share()
    {
        Application.OpenURL("https://castlesgames.github.io/");
    }

    private void FadeAnimation(int type)
    {
        _fadeImage.gameObject.SetActive(true);
        _fadeImage.color = new Color(0, 0, 0, 0);
        _fadeImage.DOColor(Color.black, 0.5f).OnComplete(() => {

            if (type != 3) _background.gameObject.SetActive(false);

            switch (type)
            {
                case 0:
                    if (OnPlay != null) OnPlay();
                    break;
                case 1:
                    if (OnRanking != null) OnRanking();
                    break;
                case 2:
                    if (OnSettings != null) OnSettings();
                    break;
                case 3:
                    InitialAnimation();
                    break;

            }

            _fadeImage.DOColor(new Color(0, 0, 0, 0),0.6f).OnComplete(() => {

                _fadeImage.gameObject.SetActive(false);
                if (type != 3)
                {
                    _background.gameObject.SetActive(false);
                }
            });
        });
    }

    private void InitialAnimation()
    {
        AudioController.Instance.PlayMenuMusic();

        _background.gameObject.SetActive(true);
        _title.localScale = new Vector3(1f, 0f, 1f);
        _menuPanel.localScale = new Vector3(1f, 0f, 1f);
        _playButton.localScale = Vector3.zero;
        _rankingButton.localScale = Vector3.zero;

        _title.DOScaleY(1f, 0.2f).OnComplete(() => {
            _menuPanel.DOScaleY(1f, 0.4f).OnComplete(() => {
                _levelText.text = (_levelManager.Level +1).ToString();
            });
            _playButton.DOScale(1f, 0.2f);
            _rankingButton.DOScale(1f, 0.2f);
        });
    }
}
