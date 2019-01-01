using UnityEngine.UI;
using UnityEngine;

public class EnemyView : MonoBehaviour
{
    [SerializeField]
    Slider _lifeSlider;

    [SerializeField]
    Text _lifeText;

    [SerializeField]
    Enemy _enemy;

    void Awake()
    {
        _enemy.OnChangeLife += Enemy_OnChangeLife;
        _enemy.OnInitialized += Enemy_OnInitialized;
    }

    private void OnDestroy()
    {
        _enemy.OnChangeLife -= Enemy_OnChangeLife;
        _enemy.OnInitialized -= Enemy_OnInitialized;
    }

    private void Enemy_OnInitialized(float life)
    {
        _lifeSlider.maxValue = life;
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();
    }

    private void Enemy_OnChangeLife(float life)
    {
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();
    }
}
