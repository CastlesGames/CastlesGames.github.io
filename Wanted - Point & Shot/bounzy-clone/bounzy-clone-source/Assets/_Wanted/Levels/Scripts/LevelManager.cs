using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelManager : MonoBehaviour
{
    [SerializeField]
    MenuView _menuView;

    [SerializeField]
    VictoryView _victoryView;

    [SerializeField]
    GameOverView _gameOverView;

    [SerializeField]
    LevelView _levelView;

    [SerializeField]
    LevelController _levelController;

    private int _level;

    public int Level
    {
        get
        {
            return _level;
        }
    }

    public event System.Action<int> OnPlayLevel;

    private void Start()
    {
        _level = PlayerPrefs.GetInt("Level", 0);

        _levelController.OnVictory += LevelController_OnVictory;
        _menuView.OnPlay += MenuView_OnPlay;
        _victoryView.OnNextLevel += VictoryView_OnNextLevel;
        _gameOverView.OnRestartLevel += GameOverView_OnRestartLevel;
        _levelView.OnRestartLevel += LevelView_OnRestartLevel;
    }

    private void OnDestroy()
    {
        _levelController.OnVictory -= LevelController_OnVictory;
        _menuView.OnPlay -= MenuView_OnPlay;
        _victoryView.OnNextLevel -= VictoryView_OnNextLevel;
        _gameOverView.OnRestartLevel -= GameOverView_OnRestartLevel;
        _levelView.OnRestartLevel -= LevelView_OnRestartLevel;
    }

    private void MenuView_OnPlay()
    {
        PlayLevel();
    }

    private void VictoryView_OnNextLevel()
    {
        PlayLevel();
    }

    private void GameOverView_OnRestartLevel()
    {
        PlayLevel();
    }

    void LevelView_OnRestartLevel()
    {
        PlayLevel();
    }

    private void LevelController_OnVictory(int level, int currentWave)
    {
        _level++;
        PlayerPrefs.SetInt("Level", _level);
        PlayerPrefs.Save();
    }

    private void PlayLevel()
    {
        if (OnPlayLevel != null) OnPlayLevel(_level);
    }
}
