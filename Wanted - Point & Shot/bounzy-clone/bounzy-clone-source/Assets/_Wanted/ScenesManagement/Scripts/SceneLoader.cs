using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class SceneLoader : MonoBehaviour
{
    [SerializeField]
    Slider _slider;

    [SerializeField]
    Text _text;

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(LoadAsyncScene("GameScene"));
    }

    IEnumerator LoadAsyncScene(string scene)
    {
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(scene,LoadSceneMode.Single);

        while (!asyncLoad.isDone)
        {
            Debug.Log("Progress " + asyncLoad.progress);
            _slider.value = asyncLoad.progress;
            _text.text = (int)(asyncLoad.progress * 111) + "%";
            if (asyncLoad.progress == 0.9f)
            {
                _slider.value = 1f;
                asyncLoad.allowSceneActivation = true;
            }
            yield return null;
        }
    }
}
