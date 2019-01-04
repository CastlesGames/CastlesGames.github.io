using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using MovementEffects;
using System;

public class Boss : MonoBehaviour
{
    [SerializeField]
    Transform _transform;

    [SerializeField]
    Collider2D _collision;

    [SerializeField]
    private float _incrementDamage;

    [SerializeField]
    private float _damage;

    public float Damage
    {
        get
        {
            return _damage;
        }
    }

    [SerializeField]
    private float _life;

    [SerializeField]
    private float _incrementLife;

    LevelController _levelController;

    public event System.Action<float> OnChangeLife;
    public event System.Action<float> OnInitialized;
    public event System.Action OnDied;
    public event System.Action<Boss> OnDoDamage;

    private int _currentPosition;
    private int _damagePosition = 5;
    private bool _isDied = false;

    public void Initialized(int level, LevelController levelController)
    {
        _levelController = levelController;
        if (_levelController != null) _levelController.OnMoveTable += LevelController_OnMoveTable;
        _life = CalculateLife(level);
        _damage = CalculateDamage(level);
        if (OnInitialized != null) OnInitialized(_life);
    }

    private void OnDestroy()
    {
        if(_levelController != null) _levelController.OnMoveTable -= LevelController_OnMoveTable;
    }

    private void LevelController_OnMoveTable()
    {
        Move();
    }

    private void GetDamage(float damage)
    {
        _life -= damage;
        if (_life > 0)
        {
            if (OnChangeLife != null) OnChangeLife(_life);
        }
        else
        {
            if (!_isDied)
            {
                if (OnDied != null) OnDied();
                _isDied = true;
                _collision.enabled = false;
                Timing.RunCoroutine(AnimationDie(1f));
            }
        }
    }

    private IEnumerator<float> AnimationDie(float time)
    {
        yield return Timing.WaitForSeconds(time);
        Destroy(this.gameObject);
    }

    private float CalculateDamage(int level)
    {
        if (level > 0)
        {
            float newDamage = _damage + (_incrementDamage * level);
            return newDamage;
        }
        else
        {
            return _damage;
        }
    }

    private float CalculateLife(int level)
    {
        if (level > 0)
        {
            float newLife = _life + (_incrementLife * level); ;
            return newLife;
        }
        else
        {
            return _life;
        }
    }

    private void Move()
    {
        _transform.DOMoveY(_transform.position.y - 0.97f, 0.5f).OnComplete(() => {
            if (_currentPosition >= _damagePosition)
            {
                if (!_isDied)
                {
                    if (OnDied != null) OnDied();
                    if (OnDoDamage != null) OnDoDamage(this);

                    _isDied = true;
                    _collision.enabled = false;
                    Timing.RunCoroutine(AnimationDie(1f));
                }
                //Destroy(this.gameObject);
            }
        });
        _currentPosition++;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Bullet")
        {
            collision.isTrigger = false;
            GetDamage(collision.gameObject.GetComponent<BulletController>().Damage);
        }
    }

    private void OnCollisionExit2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Bullet")
        {
            collision.collider.isTrigger = true;
        }
    }
}
