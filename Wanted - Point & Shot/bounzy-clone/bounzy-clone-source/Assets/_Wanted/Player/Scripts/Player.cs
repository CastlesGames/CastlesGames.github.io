using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    [SerializeField]
    private float _life;

    [SerializeField]
    private float _damageBullet;

    public float DamageBullet
    {
        get
        {
            return _damageBullet;
        }
    }

    [SerializeField]
    private int _bullets;

    public int Bullets
    {
        get
        {
            return _bullets;
        }
    }

    [SerializeField]
    private float _shotVelocity;

    public float ShotVelocity
    {
        get
        {
            return _shotVelocity;
        }
    }

    public System.Action<float> OnChangeLife;
    public System.Action OnDied;
    public System.Action<int> OnChangeBullets;
    public System.Action<float> OnChangeDamageBullet;

    public void ChangeLife(float change)
    {
        _life += change;
        if(_life > 0)
        {
            OnChangeLife(_life);
        }
        else
        {
            OnDied();
        }
    }

    public void ChangeBullets(int change)
    {
        _bullets += change;
        OnChangeBullets(_bullets);
    }

    public void ChangeDamageBullet(float change)
    {
        _damageBullet += change;
        OnChangeDamageBullet(_damageBullet);
    }
}
