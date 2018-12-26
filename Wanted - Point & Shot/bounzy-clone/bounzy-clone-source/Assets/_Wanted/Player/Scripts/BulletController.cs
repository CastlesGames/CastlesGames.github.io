using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletController : MonoBehaviour
{
    [SerializeField]
    Rigidbody2D _rigidbody;

    [SerializeField]
    float velocity;

    public void Initialized(Vector3 direction){
        _rigidbody.velocity = direction * velocity;
    }
}
