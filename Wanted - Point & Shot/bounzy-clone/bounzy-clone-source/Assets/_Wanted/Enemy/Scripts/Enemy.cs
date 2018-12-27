using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;

public class Enemy : MonoBehaviour
{
    [SerializeField]
    Transform _transform;

    [SerializeField]
    SpriteRenderer _renderer;

    [SerializeField]
    private Sprite _sprite;

    [SerializeField]
    private float _damage;

    [SerializeField]
    private float _life;

    public event System.Action<float> OnChangeLife;
    public event System.Action OnDied;
    public event System.Action<float> OnDoDamage;

    private int _currentPosition;
    private int _damagePosition = 5;

    public void Initialized(float lifeChange, float damageChange)
    {
        _renderer.sprite = _sprite;
        _life = _life + lifeChange;
        _damage = _damage + damageChange;
    }

    private void GetDamage(float damage)
    {
        _life -= damage;
        if(_life > 0)
        {
            if (OnChangeLife != null) OnChangeLife(_life);
        }
        else
        {
            if (OnDied != null) OnDied();
            Destroy(this.gameObject);
        }
    }

    private void Move()
    {
        _transform.DOMoveY(_transform.position.y - 1f, 1f).OnComplete(() => {
            if (_currentPosition >= _damagePosition)
            {
                if (OnDoDamage != null) OnDoDamage(_damage);
                Destroy(this.gameObject);
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
