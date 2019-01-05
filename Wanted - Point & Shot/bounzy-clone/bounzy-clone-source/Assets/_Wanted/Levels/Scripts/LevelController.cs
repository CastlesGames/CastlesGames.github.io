using System.Collections.Generic;
using MovementEffects;
using UnityEngine;

public class LevelController : MonoBehaviour
{
    [SerializeField]
    List<Transform> _enemiesSpawnersTransforms;

    [SerializeField]
    List<Transform> _bossesSpawnersTransforms;

    [SerializeField]
    List<Enemy> _enemiesPrefabs;

    [SerializeField]
    List<Boss> _bossesPrefabs;

    [SerializeField]
    LevelManager _levelManager;

    [SerializeField]
    PlayerController _playerController;

    [SerializeField]
    LevelView _levelView;

    private List<Enemy> _enemies = new List<Enemy>();
    private Boss _boss;

    private int _currentWave;
    private int _level;
    private bool _pause;
    private bool _victory;
    private List<Enemy> _enemiesAvailable = new List<Enemy>();

    public bool Pause
    {
        get
        {
            return _pause;
        }
    }

    public event System.Action<int, int> OnVictory;
    public event System.Action<int, int> OnGameOver;
    public event System.Action<int> OnUserTurn;
    public event System.Action OnMoveTable;
    public event System.Action<int,int> OnInitialized;

    private void Start()
    {
        _levelView.OnPause += LevelView_OnPause;
        _levelView.OnDesPause += LevelView_OnDesPause;
        _levelView.OnContinue += LevelView_OnContinue;
        _levelView.OnGoToMenu += LevelView_OnGoToMenu;
        _levelManager.OnPlayLevel += LevelManager_OnPlayLevel;
        _playerController.OnFinishShot += PlayerController_OnFinishShot;
    }

    private void OnDestroy()
    {
        _levelView.OnPause -= LevelView_OnPause;
        _levelView.OnDesPause -= LevelView_OnDesPause;
        _levelView.OnContinue -= LevelView_OnContinue;
        _levelView.OnGoToMenu -= LevelView_OnGoToMenu;
        _levelManager.OnPlayLevel -= LevelManager_OnPlayLevel;
        _playerController.OnFinishShot -= PlayerController_OnFinishShot;
    }

    public void Initialized(int level)
    {
        _level = level;

        _currentWave = 0;

        _pause = false;

        _victory = false;

        _enemiesAvailable.Clear();
        foreach(Enemy enemy in _enemiesPrefabs)
        {
            if(enemy.LevelMin <= _level)
            {
                _enemiesAvailable.Add(enemy);
            }
        }
        _playerController.gameObject.SetActive(true);
        SpawnEnemies(_level);
        if (OnUserTurn != null) OnUserTurn(_currentWave);

        AudioController.Instance.PlayNewLevelSound();
        if (OnInitialized != null) OnInitialized(_level,_currentWave);
    }

    private void ClearLevel()
    {
        if (_enemies.Count > 0)
        {
            for (int i = 0; i < _enemies.Count; i++)
            {
                Destroy(_enemies[i].gameObject);
            }
        }
        _playerController.gameObject.SetActive(false);
        _enemies.Clear();
        if (_boss != null) Destroy(_boss.gameObject);
    }

    private void LevelManager_OnPlayLevel(int level)
    {
        Initialized(level);
    }

    private void LevelManager_OnRestartLevel(int level)
    {
        Initialized(level);
    }

    private void LevelView_OnPause()
    {
        PauseLevel();
    }

    private void LevelView_OnDesPause()
    {
        ContinueLevel();
    }

    private void LevelView_OnGoToMenu()
    {
        ClearLevel();
    }

    private void LevelView_OnContinue()
    {
        _pause = false;
    }

    private void PlayerController_OnFinishShot()
    {
        NextWave();
    }

    private void Boss_OnDied()
    {
        _boss = null;
        if (_currentWave >= 9)
        {
            if (_enemies.Count == 0 && _boss == null)
            {
                _victory = true;
            }
        }
    }

    private void Enemy_OnDied(Enemy enemy,float life)
    {
        _enemies.Remove(enemy);

        if(_currentWave >= 9)
        {
            if(_enemies.Count == 0 && _boss == null)
            {
                _victory = true;
            }
        }
    }

    private void Enemy_OnDoDamage(Enemy enemy)
    {
        _playerController.GetDamage(enemy.Damage);
        //_enemies.Remove(enemy);
        //Destroy(enemy.gameObject);
    }

    private void Boss_OnDoDamage(Boss boss)
    {
        _playerController.KillPlayer();
        //Destroy(_boss.gameObject);
        //_boss = null;
    }

    private void NextWave()
    {
        if (OnMoveTable != null) OnMoveTable();

        Timing.RunCoroutine(NextWaveLogic(0.6f));
    }

    IEnumerator<float> NextWaveLogic(float time)
    {
        yield return Timing.WaitForSeconds(time);

        if ( _playerController.IsPlayerAlive())
        {
            if (_currentWave >= 9)
            {
                if (_enemies.Count == 0 && _boss == null)
                {
                    _victory = true;
                }
            }
            if (_victory && _playerController.isActiveAndEnabled)
            {
                if (OnVictory != null) OnVictory(_level, _currentWave);
                ClearLevel();
            }
            else if(_playerController.isActiveAndEnabled)
            {
                if (_currentWave < 7)
                {
                    SpawnEnemies(_level);
                }
                else if (_currentWave == 8)
                {
                    SpawnBoss(_level);
                }
                else
                {
                    _currentWave++;
                }

                if (OnUserTurn != null) OnUserTurn(_currentWave);
            }
        }
        else
        {
            AudioController.Instance.PlayDefeatSound();
            if (OnGameOver != null) OnGameOver(_level,_currentWave);
            ClearLevel();
        }
    }

    private void SpawnEnemies(int level)
    {
        int number = Random.Range(2, 4);

        bool[] positions = new bool[_enemiesSpawnersTransforms.Count];
        for(int i = 0; i< positions.Length; i++)
        {
            positions[i] = true;
        }

        for (int i = 0; i < number; i++)
        {
            int index = 0;
            do
            {
                index = Random.Range(0, positions.Length);

            } while (!positions[index]);

            Enemy enemy = Instantiate(_enemiesAvailable[Random.Range(0, _enemiesAvailable.Count)],
                _enemiesSpawnersTransforms[index]);
            enemy.Initialized(level, this);
            enemy.OnDied += Enemy_OnDied;
            enemy.OnDoDamage += Enemy_OnDoDamage;

            _enemies.Add(enemy);

            positions[index] = false;

        }
        _currentWave++;
    }

    private void SpawnBoss(int level)
    {
        Boss boss = Instantiate(_bossesPrefabs[Random.Range(0, _bossesPrefabs.Count)],
            _bossesSpawnersTransforms[Random.Range(0, _bossesSpawnersTransforms.Count)]);
        boss.Initialized(level, this);
        boss.OnDied += Boss_OnDied;
        boss.OnDoDamage += Boss_OnDoDamage;

        _boss = boss;

        _currentWave++;
    }

    private void PauseLevel(){
        Time.timeScale = 0;
        _pause = true;
    }

    private void ContinueLevel(){
        Time.timeScale = 1;
    }
}
