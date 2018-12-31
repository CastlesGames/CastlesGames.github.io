using System.Collections;
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
    PlayerController _playerController;

    [SerializeField]
    LevelView _levelView;

    [SerializeField]
    VictoryView _victoryView;

    private List<Enemy> _enemies = new List<Enemy>();
    private Boss _boss;

    private int _currentWave;
    private int _level;
    private bool _pause;
    private bool _victory;

    public bool Pause
    {
        get
        {
            return _pause;
        }
    }

    public event System.Action<int, int> OnVictory;
    public event System.Action OnGameOver;
    public event System.Action<int> OnUserTurn;
    public event System.Action OnMoveTable;
    public event System.Action<int,int> OnInitialized;

    private void Start()
    {
        Initialized(0);
        _playerController.OnFinishShot += PlayerController_OnFinishShot;
        _levelView.OnPause += LevelView_OnPause;
        _levelView.OnContinue += LevelView_OnContinue;
        _victoryView.OnNextLevel += VictoryView_OnNextLevel;
    }

    private void OnDestroy()
    {
        _playerController.OnFinishShot -= PlayerController_OnFinishShot;
        _levelView.OnPause -= LevelView_OnPause;
        _levelView.OnContinue -= LevelView_OnContinue;
        _victoryView.OnNextLevel -= VictoryView_OnNextLevel;
    }

    public void Initialized(int level)
    {
        Debug.Log("Inicializo Nivel");
        _level = level;
        _currentWave = 0;
        _pause = false;
        _victory = false;
        SpawnEnemies(_level);
        if (OnUserTurn != null) OnUserTurn(_currentWave);
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
        _enemies.Clear();
        if (_boss != null) Destroy(_boss.gameObject);
    }

    private void VictoryView_OnNextLevel(){
        Initialized(_level + 1);
    }

    private void LevelView_OnPause()
    {
        PauseLevel();
    }

    private void LevelView_OnContinue()
    {
        ContinueLevel();
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
                Debug.Log("HE GANADO");
                //TODO: FLUJO DE VICTORIA
                _victory = true;
            }
        }
    }

    private void Enemy_OnDied(Enemy enemy)
    {
        _enemies.Remove(enemy);

        if(_currentWave >= 9)
        {
            if(_enemies.Count == 0 && _boss == null)
            {
                Debug.Log("HE GANADO");
                //TODO: FLUJO DE VICTORIA
                _victory = true;
            }
        }
    }

    private void Enemy_OnDoDamage(Enemy enemy)
    {
        _playerController.GetDamage(enemy.Damage);
        _enemies.Remove(enemy);
        Destroy(enemy.gameObject);
    }

    private void Boss_OnDoDamage(Boss boss)
    {
        Debug.Log("FIN");
        _playerController.KillPlayer();
        Destroy(_boss.gameObject);
        _boss = null;
    }

    private void NextWave()
    {
        if (OnMoveTable != null) OnMoveTable();

        //SE ESPERA PARA EL MOV DEL TABLERO
        Timing.RunCoroutine(NextWaveLogic(1.1f));
    }

    IEnumerator<float> NextWaveLogic(float time)
    {
        yield return Timing.WaitForSeconds(time);

        if (_playerController.IsPlayerAlive())
        {
            if(_victory)
            {
                if (OnVictory != null) OnVictory(_level, _currentWave);
                ClearLevel();
            }
            else
            {
                if (_currentWave < 7)
                {
                    //QUEDAN OLEADAS DE ENEMIGOS
                    SpawnEnemies(_level);
                }
                else if (_currentWave == 8)
                {
                    //SALE EL BOSS
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
            //TODO:FLUJO DE DERROTA
            if (OnGameOver != null) OnGameOver();
            Debug.Log("PIERDO");
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

            Enemy enemy = Instantiate(_enemiesPrefabs[Random.Range(0, _enemiesPrefabs.Count)],
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
        _pause = false;
    }
}
