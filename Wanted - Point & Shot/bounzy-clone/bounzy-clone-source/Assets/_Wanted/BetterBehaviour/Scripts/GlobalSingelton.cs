using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class GlobalSingleton<T> : BetterBehaviour where T : BetterBehaviour
{
    static bool _destroyed = false;

    static T _instance = null;

    /// <summary>
    /// Get GlobalSingleton Instance
    /// </summary>
    public static T Instance
    {
        get
        {
            CreateInstance();

            return _instance;
        }
    }

    /// <summary>
    /// False if instance does not exists or has been destroyed
    /// </summary>
    public static bool HasInstance
    {

        get { return _instance != null; }
    }

    static void CreateInstance()
    {
        if (!_destroyed && _instance == null)
        {
            _instance = FindObjectOfType<T>();

            if (_instance == null)
            {
                GameObject go = new GameObject(typeof(T).Name);
                _instance = go.AddComponent<T>();
            }
        }
    }

    /// <summary>
    /// Override Awake if you use it in children classes and call to base.Awake();
    /// </summary>
    virtual protected void Awake()
    {
        if (_instance == null)
        {
            _instance = this as T;
            DontDestroyOnLoad(_instance.gameObject);
        }
    }

    void OnApplicationQuit()
    {
        _instance = null;
        _destroyed = true;
    }
}


