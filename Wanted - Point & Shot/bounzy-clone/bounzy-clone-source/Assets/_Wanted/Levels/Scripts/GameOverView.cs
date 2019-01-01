﻿using UnityEngine.UI;
using UnityEngine;
using DG.Tweening;

public class GameOverView : MonoBehaviour
{
    [SerializeField]
    Transform _gameOverScreen;

    [SerializeField]
    Transform _gameOverPopUp;

    [SerializeField]
    Text _tileText;

    [SerializeField]
    LevelController _levelController;

    public event System.Action OnRestartLevel;

    void Awake()
    {
        _levelController.OnGameOver += LevelController_OnGameOver;
    }

    private void OnDestroy()
    {
        _levelController.OnGameOver -= LevelController_OnGameOver;
    }

    private void LevelController_OnGameOver(int level, int currentWave)
    {
        Initialized(level, currentWave);
    }

    void Initialized(int level, int currentWave)
    {
        _gameOverScreen.gameObject.SetActive(true);
        _gameOverPopUp.localScale = Vector3.zero;
        _tileText.text = "";
        _gameOverPopUp.DOScale(1f, 0.5f).OnComplete(() => {
            _tileText.text = "Has perdido en el nivel " + (level + 1);
        });
    }

    public void ReStartLevel()
    {
        _gameOverScreen.gameObject.SetActive(false);
        _gameOverPopUp.DOScale(0f, 0.5f).OnComplete(() => {
            if (OnRestartLevel != null) OnRestartLevel();
        });
    }
}