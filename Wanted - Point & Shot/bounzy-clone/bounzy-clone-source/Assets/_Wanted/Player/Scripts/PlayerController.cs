using System.Collections;
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

    private bool canShot = true;
    private int currentBulletsShot;

    public event System.Action OnShot;
    public event System.Action OnFinishShot;
    public event System.Action OnActivateShot;

    void Start()
    {
        _inputController.OnHoldUp += InputController_OnHoldUp;
        _levelController.OnUserTurn += LevelController_OnUserTurn;
    }

    private void OnDestroy()
    {
        _inputController.OnHoldUp -= InputController_OnHoldUp;
        _levelController.OnUserTurn -= LevelController_OnUserTurn;
    }

    void InputController_OnHoldUp(Vector3 direction)
    {
        if (canShot)
        {
            if (direction.y > 0.3f)
            {
                canShot = false;
                currentBulletsShot = 0;

                Timing.RunCoroutine(InstantiateBullets(0.1f, direction));

                if (OnShot != null) OnShot();
            }
            else
            {
                canShot = true;
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
    }

    void BulletController_OnDestroy()
    {
        currentBulletsShot++;
        if(currentBulletsShot >= _player.Bullets)
        {
            //TODO: LLamar a FinishShot
            if (OnFinishShot != null) OnFinishShot();
        }
    }

    void LevelController_OnUserTurn()
    {
        canShot = true;
        if (OnActivateShot != null) OnActivateShot();
    }
}
