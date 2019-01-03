using UnityEngine;

public class BulletController : MonoBehaviour
{
    float _destroyPointBottom = -3f;
    float _destroyPointTop = 3.9f;

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

    public event System.Action<float> OnDestroy;

    public void Initialized(Vector3 direction, float velocity, float damage){
        _rigidbody.velocity = direction * velocity;
        transform.rotation = Quaternion.LookRotation(Vector3.forward, direction);
        _damage = damage;
    }

    private void Update()
    {
        if(transform.position.y < _destroyPointBottom || 
        transform.position.y > _destroyPointTop )
        {
            if (OnDestroy != null) OnDestroy(transform.position.x);
            Destroy(this.gameObject);
        }
    }
}
