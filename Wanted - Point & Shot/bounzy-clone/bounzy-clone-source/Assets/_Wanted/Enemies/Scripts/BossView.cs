using UnityEngine.UI;
using UnityEngine;
using DG.Tweening;

public class BossView : MonoBehaviour
{
    [SerializeField]
    Slider _lifeSlider;

    [SerializeField]
    Text _lifeText;

    [SerializeField]
    Transform _renderer;

    [SerializeField]
    ParticleSystem _instantiateParticleSystem;

    [SerializeField]
    ParticleSystem _diedParticleSystem;

    [SerializeField]
    Boss _boss;

    void Awake()
    {
        _boss.OnChangeLife += Boss_OnChangeLife;
        _boss.OnInitialized += Boss_OnInitialized;
        _boss.OnDied += Boss_OnDied;
    }

    private void OnDestroy()
    {
        _boss.OnChangeLife -= Boss_OnChangeLife;
        _boss.OnInitialized -= Boss_OnInitialized;
        _boss.OnDied -= Boss_OnDied;
    }

    private void Boss_OnInitialized(float life)
    {
        _lifeSlider.maxValue = life;
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();

        _instantiateParticleSystem.Play();
        if (_renderer != null) _renderer.DOScale(new Vector3(1.05f, 1.3f, 1f), 0.04f).OnComplete(() =>
        {
            if (_renderer != null) _renderer.DOScale(new Vector3(1f, 1f, 1f), 0.06f);
        });
    }

    private void Boss_OnChangeLife(float life)
    {
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();
    }

    void Boss_OnDied()
    {
        _lifeSlider.gameObject.SetActive(false);
        _renderer.gameObject.SetActive(false);

        _diedParticleSystem.gameObject.SetActive(true);
        _diedParticleSystem.Play();
    }
}
