using System.Collections;
using System.Collections.Generic;
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
    RectTransform _sherifButton;

    [SerializeField]
    Image _fadeImage;

    [SerializeField]
    Text _levelText;

    [SerializeField]
    LevelView _levelView;

    [SerializeField]
    LevelManager _levelManager;

    public event System.Action OnPlay;
    public event System.Action OnRanking;
    public event System.Action OnSherif;

    private void Start()
    {
        //cambio
        InitialAnimation();
        _levelView.OnGoToMenu += LevelView_OnGoToMenu;
    }

    private void OnDestroy()
    {
        _levelView.OnGoToMenu -= LevelView_OnGoToMenu;
    }

    private void LevelView_OnGoToMenu()
    {
        FadeAnimation(3);
    }

    public void Play()
    {
        FadeAnimation(0);
    }

    public void Ranking()
    {
        //TODO: VER COMO HAGO RANKING
    }

    public void Sherif()
    {
        FadeAnimation(2);
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
                    if (OnSherif != null) OnSherif();
                    break;

            }

            _fadeImage.DOColor(new Color(0, 0, 0, 0),0.6f).OnComplete(() => {

                _fadeImage.gameObject.SetActive(false);
                if (type != 3)
                {
                    _background.gameObject.SetActive(false);
                }
                else
                {
                    InitialAnimation();
                }
            });
        });
    }

    private void InitialAnimation()
    {
        _background.gameObject.SetActive(true);
        _title.localScale = new Vector3(1f, 0f, 1f);
        _menuPanel.localScale = new Vector3(1f, 0f, 1f);
        _levelText.text = "";
        _playButton.localScale = Vector3.zero;
        _rankingButton.localScale = Vector3.zero;
        _sherifButton.localScale = Vector3.zero;

        _title.DOScaleY(1f, 0.2f).OnComplete(() => {
            _menuPanel.DOScaleY(1f, 0.4f).OnComplete(() => {
                _levelText.text = "Nivel: " + (_levelManager.Level +1);
                _playButton.DOScale(1f, 0.2f);
                _rankingButton.DOScale(1f, 0.2f);
                _sherifButton.DOScale(1f, 0.2f);
            });
        });
    }
}
