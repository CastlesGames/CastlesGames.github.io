using System.Collections.Generic;
using UnityEngine;
using MovementEffects;

public class PlayerController : MonoBehaviour
{
    [SerializeField]
    Player _player;

    [SerializeField]
    InputController _inputController;

    [SerializeField]
    LevelController _levelController;

    [SerializeField]
    BulletController _bulletPrefab;

    [SerializeField]
    Transform _bulletSpawner;

    [SerializeField]
    PlayerView _playerView;

    private bool _canShot = true;
    private int _currentBulletsShot;

    public event System.Action OnShot;
    public event System.Action OnFinishShot;
    public event System.Action OnActivateShot;
    public event System.Action OnInstantiateBullets;

    void Awake()
    {
        _inputController.OnHoldUp += InputController_OnHoldUp;
        _levelController.OnUserTurn += LevelController_OnUserTurn;
        _playerView.OnEndTurn += PlayerView_OnEndTurn;
        _levelController.OnVictory += LevelController_OnVictory;
        _levelController.OnInitialized += LevelController_OnInitialized;
    }

    private void LevelController_OnInitialized(int level, int currentWave){
        Initialized(level, currentWave);
    }

    void Initialized(int level, int currentWave)
    {
        _player.Initialized(12, 10, 5);
        Timing.RunCoroutine(DelayCanShot());
    }

    IEnumerator<float> DelayCanShot()
    {
        yield return Timing.WaitForSeconds(0.2f);
        _canShot = true;
    }

    public void GetDamage(float damage)
    {
        _player.ChangeLife(damage);
    }

    public void KillPlayer()
    {
        _player.Kill();
    }

    public bool IsPlayerAlive()
    {
        return _player.IsLife();
    }

    private void OnDestroy()
    {
        _inputController.OnHoldUp -= InputController_OnHoldUp;
        _levelController.OnUserTurn -= LevelController_OnUserTurn;
        _playerView.OnEndTurn -= PlayerView_OnEndTurn;
        _levelController.OnVictory -= LevelController_OnVictory;
        _levelController.OnInitialized -= LevelController_OnInitialized;
    }

    private void PlayerView_OnEndTurn(){
        foreach(Transform t in _bulletSpawner){
            Destroy(t.gameObject);
            BulletController_OnDestroy();
        }
    }

    private void LevelController_OnVictory(int level, int currentWave)
    {
        _canShot = false;
    }

    void InputController_OnHoldUp(Vector3 direction)
    {
        if (_canShot && !_levelController.Pause)
        {
            if (direction.y > 0.3f)
            {
                _canShot = false;
                _currentBulletsShot = 0;

                Timing.RunCoroutine(InstantiateBullets(0.1f, direction));

                if (OnShot != null) OnShot();
            }
            else
            {
                _canShot = true;
            }
        }
    }

    IEnumerator<float> InstantiateBullets(float time, Vector3 direction)
    {
        for (int i = 0; i < _player.Bullets; i++)
        {
            BulletController bullet = Instantiate(_bulletPrefab, _bulletSpawner);
            bullet.Initialized(direction, _player.ShotVelocity, _player.DamageBullet);
            bullet.OnDestroy += BulletController_OnDestroy;

            yield return Timing.WaitForSeconds(time);
        }

        if (OnInstantiateBullets != null) OnInstantiateBullets();
    }

    void BulletController_OnDestroy()
    {
        _currentBulletsShot++;
        if(_currentBulletsShot >= _player.Bullets)
        {
            if (OnFinishShot != null) OnFinishShot();
        }
    }

    void LevelController_OnUserTurn(int currentWave)
    {
        _canShot = true;
        if (OnActivateShot != null) OnActivateShot();
    }
}
