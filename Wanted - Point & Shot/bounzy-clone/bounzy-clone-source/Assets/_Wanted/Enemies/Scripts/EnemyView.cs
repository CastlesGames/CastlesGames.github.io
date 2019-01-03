using UnityEngine.UI;
using UnityEngine;
using DG.Tweening;

public class EnemyView : MonoBehaviour
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
    Enemy _enemy;

    void Awake()
    {
        _enemy.OnChangeLife += Enemy_OnChangeLife;
        _enemy.OnInitialized += Enemy_OnInitialized;
        _enemy.OnDied += Enemy_OnDied;
    }

    private void OnDestroy()
    {
        _enemy.OnChangeLife -= Enemy_OnChangeLife;
        _enemy.OnInitialized -= Enemy_OnInitialized;
        _enemy.OnDied -= Enemy_OnDied;
    }

    private void Enemy_OnInitialized(float life)
    {
        _lifeSlider.maxValue = life;
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();

        _instantiateParticleSystem.Play();
    }

    private void Enemy_OnChangeLife(float life)
    {
        _lifeSlider.value = life;
        _lifeText.text = life.ToString();
        if (_renderer != null) _renderer.DOScale(new Vector3(1.05f, 1.3f, 1f), 0.04f).OnComplete(() =>
        {
            if (_renderer != null) _renderer.DOScale(new Vector3(1f, 1f, 1f), 0.06f);
        });
    }

    private void Enemy_OnDied(Enemy enemy, float life)
    {
        _lifeSlider.gameObject.SetActive(false);
        _renderer.gameObject.SetActive(false);

        _diedParticleSystem.gameObject.SetActive(true);
        _diedParticleSystem.Play();
    }
}
