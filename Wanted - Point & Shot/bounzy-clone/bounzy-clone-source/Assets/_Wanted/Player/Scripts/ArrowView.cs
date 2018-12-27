using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ArrowView : MonoBehaviour
{
    [SerializeField]
    InputController _inputController;

    [SerializeField]
    PlayerController _playerController;

    [SerializeField]
    Transform _transform;

    [SerializeField]
    SpriteRenderer _renderer;

    private bool _canDraw = true;

    // Start is called before the first frame update
    void Start()
    {
        _inputController.OnHold += InputController_OnHold;
        _playerController.OnShot += PlayerController_OnShot;
        _playerController.OnActivateShot += PlayerController_OnActivateShot;
    }

    private void OnDestroy()
    {
        _inputController.OnHold -= InputController_OnHold;
        _playerController.OnShot -= PlayerController_OnShot;
        _playerController.OnActivateShot -= PlayerController_OnActivateShot;
    }

    void InputController_OnHold(Vector3 direction){
        if (_canDraw)
        {
            Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            _transform.rotation = Quaternion.LookRotation(Vector3.forward, mousePos - transform.position);

            if (direction.y > 0.25f)
            {
                _renderer.enabled = true;
            }
            else
            {
                _renderer.enabled = false;
            }
        }
    }

    void PlayerController_OnShot()
    {
        _canDraw = false;
        _renderer.enabled = false;
    }

    void PlayerController_OnActivateShot()
    {
        _canDraw = true;
        _renderer.enabled = true;
        _transform.rotation = Quaternion.identity;
    }
}
