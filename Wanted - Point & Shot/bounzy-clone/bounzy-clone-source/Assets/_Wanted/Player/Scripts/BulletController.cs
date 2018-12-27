using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletController : MonoBehaviour
{
    [SerializeField]
    float _destroyPoint;

    [SerializeField]
    Rigidbody2D _rigidbody;

    private float _damage;

    public float Damage
    {
        get
        {
            return _damage;
        }
    }

    public event System.Action OnDestroy;

    public void Initialized(Vector3 direction, float velocity, float damage){
        _rigidbody.velocity = direction * velocity;
        _damage = damage;
    }

    private void Update()
    {
        if(transform.position.y < _destroyPoint)
        {
            if (OnDestroy != null) OnDestroy();
            Destroy(this.gameObject);
        }
    }
}
