using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePointerView : MonoBehaviour
{
    [SerializeField]
    Transform _transform;

    [SerializeField]
    PlayerController _playerController;

    [SerializeField]
    LevelController _levelController;

    // Start is called before the first frame update
    void Awake()
    {
        _levelController.OnInitialized += LevelController_OnInitialized;
        _levelController.OnVictory += LevelController_OnVictory;
        _levelController.OnGameOver += LevelController_OnGameOver;
        _playerController.OnMove += PlayerController_OnMove;
    }

    private void OnDestroy()
    {
        _levelController.OnInitialized -= LevelController_OnInitialized;
        _levelController.OnVictory -= LevelController_OnVictory;
        _levelController.OnGameOver -= LevelController_OnGameOver;
        _playerController.OnMove -= PlayerController_OnMove;
    }

    void LevelController_OnInitialized(int level, int currentWave)
    {
        _transform.gameObject.SetActive(true);
    }

    void LevelController_OnVictory(int arg1, int arg2)
    {
        _transform.gameObject.SetActive(false);
    }

    void LevelController_OnGameOver(int arg1, int arg2)
    {
        _transform.gameObject.SetActive(false);
    }

    void PlayerController_OnMove(float positionX)
    {
        _transform.position = new Vector3(positionX, _transform.position.y, transform.position.z);
    }

}
