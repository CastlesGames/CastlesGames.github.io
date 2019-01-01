using UnityEngine.UI;
using UnityEngine;

public class BossView : MonoBehaviour
{
    [SerializeField]
    Slider _lifeSlider;

    [SerializeField]
    Text _lifeText;

    [SerializeField]
    Boss _boss;

    void Awake()
    {
        _boss.OnChangeLife += Boss_OnChangeLife;
        _boss.OnInitialized += Boss_OnInitialized;
    }

    private void OnDestroy()
    {
        _boss.OnChangeLife -= Boss_OnChangeLife;
        _boss.OnInitialized -= Boss_OnInitialized;
    }

    private void Boss_OnInitialized(float life)
    {
        _lifeSlider.maxValue = life;
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();
    }

    private void Boss_OnChangeLife(float life)
    {
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();
    }
}
