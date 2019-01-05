using UnityEngine.UI;
using DG.Tweening;
using UnityEngine;

public class SettingsView : MonoBehaviour
{
    [SerializeField]
    MenuView _menuView;

    [SerializeField]
    RectTransform _background;

    [SerializeField]
    Transform _panelSettings;

    [SerializeField]
    Image _soundButtonImage;

    [SerializeField]
    Image _musicButtonImage;

    [SerializeField]
    Text _spanishButtonText;

    [SerializeField]
    Text _englishButtonText;

    [SerializeField]
    Color _greenColor;

    [SerializeField]
    Color _redColor;

    public event System.Action OnClose;

    // Start is called before the first frame update
    void Start()
    {
        _menuView.OnSettings += MenuView_OnSettings;
    }

    void OnDestroy()
    {
        _menuView.OnSettings -= MenuView_OnSettings;
    }

    private void MenuView_OnSettings()
    {
        Initialized();
    }

    void Initialized()
    {
        _background.gameObject.SetActive(true);
        _panelSettings.localScale = Vector3.zero;
        _panelSettings.DOScale(1f, 0.2f).OnComplete(() => {

            if(AudioController.Instance.IsMusicOn)
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

            //TODO: HACER LENGUAJE

        });
    }

    public void Music()
    {
        if(AudioController.Instance.IsMusicOn)
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

    public void Sound()
    {
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

    public void Close()
    {
        _panelSettings.DOScale(0f,0.2f).OnComplete(() => {
            _background.gameObject.SetActive(false);
            if (OnClose != null) OnClose();
        });
    }

    public void SpanishLenguage()
    {
        
    }

    public void EnglishLenguage()
    {
        
    }
}
