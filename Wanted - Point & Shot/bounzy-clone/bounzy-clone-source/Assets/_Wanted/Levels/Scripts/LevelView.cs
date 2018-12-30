using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LevelView : MonoBehaviour
{
    [SerializeField]
    Text _damageBulletText;

    [SerializeField]
    Text _levelText;

    [SerializeField]
    Text _lifeText;

    [SerializeField]
    Slider _lifeSlider;

    [SerializeField]
    Transform _randomPhrasesTransform;

    [SerializeField]
    Text _titleRandomPhrasesText;

    [SerializeField]
    Text _randomPhraseText;

    [SerializeField]
    List<Image> _waveListImages;

    public void InitializedLevelInfo(int level, int currentWave)
    {
        _levelText.text = level.ToString();
        foreach(Image image in _waveListImages)
        {
            image.color = Color.black;
        }
        _waveListImages[currentWave].color = Color.white;
    }

    public void InitializedPlayerInfo(float damageBullet, float life)
    {
        _damageBulletText.text = damageBullet.ToString();
        _lifeText.text = life.ToString();
        _lifeSlider.maxValue = life;
        _lifeSlider.value = life;
    }
}
