using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;
using DG.Tweening;

public class SceneLoader : MonoBehaviour
{
    [SerializeField]
    Slider _slider;

    [SerializeField]
    Text _text;

    // Start is called before the first frame update
    void Start()
    {
        LoadAsyncScene("GameScene");
    }

    private void Update()
    {
        _text.text = (_slider.value * 100).ToString("f0") + "%";
    }

    void LoadAsyncScene(string scene)
    {
        _slider.value = 0;
        _slider.DOValue(1f, 3f).OnComplete(() => {
           SceneManager.LoadScene(scene, LoadSceneMode.Single);
        });
    }
}
