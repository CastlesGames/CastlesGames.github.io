using System.Collections.Generic;
using UnityEngine;
using MovementEffects;
using DG.Tweening;

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
    Transform _transform;

    [SerializeField]
    LevelView _levelView;

    private bool _canShot = true;
    private int _currentBulletsShot;
    private float _positionX;

    public event System.Action OnShot;
    public event System.Action OnFinishShot;
    public event System.Action OnActivateShot;
    public event System.Action OnInstantiateBullets;

    void Awake()
    {
        _inputController.OnHoldUp += InputController_OnHoldUp;
        _levelController.OnUserTurn += LevelController_OnUserTurn;
        _levelView.OnEndTurn += LevelView_OnEndTurn;
        _levelController.OnVictory += LevelController_OnVictory;
        _levelController.OnInitialized += LevelController_OnInitialized;
    }

    private void OnDestroy()
    {
        _inputController.OnHoldUp -= InputController_OnHoldUp;
        _levelController.OnUserTurn -= LevelController_OnUserTurn;
        _levelView.OnEndTurn -= LevelView_OnEndTurn;
        _levelController.OnVictory -= LevelController_OnVictory;
        _levelController.OnInitialized -= LevelController_OnInitialized;
    }

    private void OnDisable()
    {
        LevelView_OnEndTurn();
    }

    private void LevelController_OnInitialized(int level, int currentWave){
        Initialized(level, currentWave);
    }

    private void LevelController_OnVictory(int level, int currentWave)
    {
        _canShot = false;
    }

    private void InputController_OnHoldUp(Vector3 direction)
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

    private void BulletController_OnDestroy(float positionX)
    {
        _currentBulletsShot++;
        if(_currentBulletsShot == 1)
        {
            _positionX = positionX;
        }
        if (_currentBulletsShot >= _player.Bullets)
        {
            //if (OnFinishShot != null) OnFinishShot();
            Move(_positionX);
        }
    }

    private void LevelView_OnEndTurn()
    {
        foreach (Transform t in _bulletSpawner)
        {
            Destroy(t.gameObject);
            BulletController_OnDestroy(t.position.x);
        }
    }

    private void LevelController_OnUserTurn(int currentWave)
    {
        _canShot = true;
        if (OnActivateShot != null) OnActivateShot();
    }

    void Initialized(int level, int currentWave)
    {
        //TODO: Coger del guardado
        _player.Initialized();

        _positionX = 0f;
        _transform.position = new Vector3(_positionX,-3f,0f);
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

    void Move(float positionX)
    {
        if(positionX > 1.3f)
        {
            _transform.DOMoveX(1.3f, 0.4f).OnComplete(() => {
                if (OnFinishShot != null) OnFinishShot();
             });
        }
        else if(positionX < -1.3f)
        {
            _transform.DOMoveX(-1.3f, 0.4f).OnComplete(() => {
                if (OnFinishShot != null) OnFinishShot();
            });
        }
        else
        {
            _transform.DOMoveX(positionX, 0.4f).OnComplete(() => {
                if (OnFinishShot != null) OnFinishShot();
            });
        }
    }
}
