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
    public System.Action<int> OnChangeBullets;
    public System.Action<float> OnChangeDamageBullet;

    public void Initialized(float life, float damageBullet, int bullets)
    {
        _life = life;
        _damageBullet = damageBullet;
        _bullets = bullets;
    }

    public void ChangeLife(float change)
    {
        _life -= change;
        if (OnChangeLife != null) OnChangeLife(_life);
    }

    public void Kill()
    {
        _life = 0;
        if (OnChangeLife != null) OnChangeLife(_life);
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

    public bool IsLife()
    {
        return _life > 0;
    }
}
