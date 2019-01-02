﻿using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using System;
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
    Text _titleRandomPhrasesText;

    [SerializeField]
    Text _randomPhraseText;

    [SerializeField]
    List<Image> _waveListImages;

    [SerializeField]
    Transform _pauseButton;

    [SerializeField]
    Transform _pauseBackground;

    [SerializeField]
    Transform _pausePopUp;

    [SerializeField]
    String[] _randomPhrases;

    [SerializeField]
    LevelController _levelController;

    public event System.Action OnPause;
    public event System.Action OnDesPause;
    public event System.Action OnContinue;
    public event System.Action OnEndTurn;
    public event System.Action OnGoToMenu;

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
    }

    void UpdateInfo(int currentWave)
    {
        AnimationImageWave(currentWave - 1);
    }

    private void SetRandomPhrase(){
        _randomPhrasesTransform.gameObject.SetActive(true);
        _randomPhraseText.text = "";
        _titleRandomPhrasesText.text = "";
        _randomPhrasesTransform.localScale = new Vector3(0f, 1f, 1f);

        _randomPhrasesTransform.DOScaleX(1f, 0.15f).OnComplete(() => {
            _titleRandomPhrasesText.text = "¡TÚ TURNO!";
            _randomPhraseText.text = GetRandomPhrase();
            Timing.RunCoroutine(DesactivateRandomPhrase(1f));
        });
    }

    IEnumerator<float> DesactivateRandomPhrase(float time)
    {
        yield return Timing.WaitForSeconds(time);
        _randomPhraseText.text = "";
        _titleRandomPhrasesText.text = "";
        _randomPhrasesTransform.DOScaleX(0f, 0.15f).OnComplete(() => {
            _randomPhrasesTransform.gameObject.SetActive(false);
            _pauseButton.gameObject.SetActive(true);
        });
    }

    private string GetRandomPhrase()
    {
        return _randomPhrases[UnityEngine.Random.Range(0, _randomPhrases.Length)];
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
        _pauseBackground.gameObject.SetActive(true);

        _pausePopUp.localScale = Vector3.zero;
        _pausePopUp.DOScale(1f,0.5f).OnComplete(() => {
            if (OnPause != null) OnPause();
        });
    }

    public void Continue(){
        if (OnDesPause != null) OnDesPause();

        _pausePopUp.DOScale(0f, 0.5f).OnComplete(() => {
            if (OnContinue != null) OnContinue();
            _pauseBackground.gameObject.SetActive(false);
        });
    }

    public void EndTurn()
    {
        if (OnEndTurn != null) OnEndTurn();
    }

    public void GoToMenu()
    {
        if (OnGoToMenu != null) OnGoToMenu();
        if (OnDesPause != null) OnDesPause();
        _pauseBackground.gameObject.SetActive(false);
        _levelUI.gameObject.SetActive(false);
    }
}
