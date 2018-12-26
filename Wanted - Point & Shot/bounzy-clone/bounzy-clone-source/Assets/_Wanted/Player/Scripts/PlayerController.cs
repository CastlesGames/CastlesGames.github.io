using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField]
    InputController _inputController;

    [SerializeField]
    BulletController _bulletPrefab;

    public event System.Action OnShot;

    void Start()
    {
        _inputController.OnHoldUp += InputController_OnHoldUp;
    }

    private void OnDestroy()
    {
        _inputController.OnHoldUp -= InputController_OnHoldUp;
    }

    // Update is called once per frame
    void Update()
    {

    }

    void InputController_OnHoldUp(Vector3 direction)
    {
        if(direction.y > 0){
            Debug.Log("Capturo el evento");
            BulletController bullet = Instantiate(_bulletPrefab);
            bullet.Initialized(direction);
            if (OnShot != null) OnShot();
        }
        else{
            Debug.Log("Anulo disparo");
        }
    }

}
