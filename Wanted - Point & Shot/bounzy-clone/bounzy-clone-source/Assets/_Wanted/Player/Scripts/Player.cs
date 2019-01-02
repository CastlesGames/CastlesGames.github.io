using UnityEngine;

public class Player : MonoBehaviour
{
    [SerializeField]
    private float _lifeInitial;

    [SerializeField]
    private float _damageBulletsInitial;

    [SerializeField]
    private int _bulletsInitial;

    private float _life;
    public float Life
    {
        get
        {
            return _life;
        }
    }

    private float _damageBullet;
    public float DamageBullet
    {
        get
        {
            return _damageBullet;
        }
    }

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

    [SerializeField]
    private float _incrementLife;

    public float IncrementLife
    {
        get
        {
            return _incrementLife;
        }
    }

    [SerializeField]
    private int _incrementBullets;

    public int IncrementBullets
    {
        get
        {
            return _incrementBullets;
        }
    }

    [SerializeField]
    private int _maxBullets;

    public int MaxBullets
    {
        get
        {
            return _maxBullets;
        }
    }

    [SerializeField]
    private float _incrementDamage;

    public float IncrementDamage
    {
        get
        {
            return _incrementDamage;
        }
    }

    public event System.Action<float> OnChangeLife;
    public event System.Action<int> OnChangeBullets;
    public event System.Action<float> OnChangeDamageBullet;
    public event System.Action<float, float> OnInitialized;

    public void Initialized()
    {
        _life = PlayerPrefs.GetFloat("Life", _lifeInitial);
        _damageBullet = PlayerPrefs.GetFloat("DamageBullet",_damageBulletsInitial);
        _bullets = PlayerPrefs.GetInt("Bullets",_bulletsInitial);

        if (OnInitialized != null) OnInitialized(_life, _damageBullet);
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
        if (OnChangeBullets != null) OnChangeBullets(_bullets);
    }

    public void ChangeDamageBullet(float change)
    {
        _damageBullet += change;
        if (OnChangeDamageBullet != null) OnChangeDamageBullet(_damageBullet);
    }

    public void ImproveLife()
    {
        _life += _incrementLife;
        PlayerPrefs.SetFloat("Life", _life);
        PlayerPrefs.Save();
    }

    public void ImproveDamage()
    {
        _damageBullet += _incrementDamage;
        PlayerPrefs.SetFloat("DamageBullet", _damageBullet);
        PlayerPrefs.Save();
    }

    public void ImproveBullets()
    {
        _bullets += _incrementBullets;
        PlayerPrefs.SetInt("Bullets", _bullets);
        PlayerPrefs.Save();
    }

    public bool IsMaxBullets()
    {
        return _bullets >= _maxBullets;
    }

    public bool IsLife()
    {
        return _life > 0;
    }
}
