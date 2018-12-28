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

    private List<Enemy> _enemies = new List<Enemy>();
    private Boss _boss;

    private int _currentWave;
    private int _level;

    public event System.Action OnVictory;
    public event System.Action OnGameOver;
    public event System.Action OnUserTurn;
    public event System.Action OnMoveTable;

    private void Start()
    {
        Initialized(0);
        _playerController.OnFinishShot += PlayerController_OnFinishShot;
    }

    private void OnDestroy()
    {
        _playerController.OnFinishShot -= PlayerController_OnFinishShot;
    }

    public void Initialized(int level)
    {
        //TODO: Instancia nuevos enemigo
        _level = level;
        _currentWave = 0;
        SpawnEnemies(_level);
    }

    private void PlayerController_OnFinishShot()
    {
        NextWave();
    }

    private void Boss_OnDied()
    {
        _boss = null;
    }

    private void Enemy_OnDied(Enemy enemy)
    {
        _enemies.Remove(enemy);
    }

    private void NextWave()
    {
        //TODO: Instancia nuevos enemigos si se puede
        //Siempre baja el tablero
        if (OnMoveTable != null) OnMoveTable();

        //SE ESPERA PARA EL MOV DEL TABLERO
        Timing.RunCoroutine(NextWaveLogic(1.1f));
    }

    IEnumerator<float> NextWaveLogic(float time)
    {
        yield return Timing.WaitForSeconds(time);

        if(_currentWave < 7)
        {
            //QUEDAN OLEADAS DE ENEMIGOS
            SpawnEnemies(_level);
        }
        else if(_currentWave == 8)
        {
            //SALE EL BOSS
            SpawnBoss(_level);
        }
        else
        {
            _currentWave++;
        }

        if (OnUserTurn != null) OnUserTurn();
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
        _boss = boss;

        _currentWave++;
    }
}
