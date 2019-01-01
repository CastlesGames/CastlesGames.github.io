using UnityEngine.UI;
using UnityEngine;
using DG.Tweening;

public class VictoryView : MonoBehaviour
{
    [SerializeField]
    Transform _victoryScreen;

    [SerializeField]
    Transform _victoryPopUp;

    [SerializeField]
    Text _tileText;

    [SerializeField]
    LevelController _levelController;

    public event System.Action OnNextLevel;

    void Awake()
    {
        _levelController.OnVictory += LevelController_OnVictory;
    }

    private void OnDestroy()
    {
        _levelController.OnVictory -= LevelController_OnVictory;
    }

    private void LevelController_OnVictory(int level, int currentWave){
        Initialized(level, currentWave);
    }

    void Initialized(int level, int currentWave)
    {
        _victoryScreen.gameObject.SetActive(true);
        _victoryPopUp.localScale = Vector3.zero;
        _tileText.text = "";
        _victoryPopUp.DOScale(1f, 0.5f).OnComplete(() => {
            _tileText.text = "Victoria en el nivel " + (level+1);
        });
    }

    public void NextLevel()
    {
        _victoryScreen.gameObject.SetActive(false);
        _victoryPopUp.DOScale(0f, 0.5f).OnComplete(() => {
            if (OnNextLevel != null) OnNextLevel(); 
        });
    }
}
