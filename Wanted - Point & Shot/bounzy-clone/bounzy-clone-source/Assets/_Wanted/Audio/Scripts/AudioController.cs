using UnityEngine;
using DG.Tweening;


public class AudioController : GlobalSingleton<AudioController>
{

    #region Unity Editor Members

    [SerializeField]
    AudioClip _buttonSound;

    [SerializeField]
    AudioClip _defeatSound;

    [SerializeField]
    AudioClip _shotSound;

    [SerializeField]
    AudioClip _newLevelSound;

    [SerializeField]
    AudioClip _bounceSound;

    [SerializeField]
    AudioClip _gameMusic;

    [SerializeField]
    AudioClip _menuMusic;

    #endregion

    #region Private Fields

    protected bool _isMusicOn;
    protected bool _isSoundOn;

    protected bool _isPlayingMusic = false;
    protected bool _isPlayingAmbiental = false;

    private AudioSource _musicSource;
    private AudioSource _ambientalSource;
    private AudioSource _fxSoundsSource;
    private AudioSource _uiSoundsSource;

    #endregion

    #region Public properties

    public bool IsMusicOn
    {
        get
        {
            return _isMusicOn;
        }

        set
        {
            _isMusicOn = value;

            if (_isMusicOn)
            {
                if (_isPlayingMusic)
                {
                    MusicSource.UnPause();
                }
                PlayerPrefs.SetInt("Music", 1);
            }
            else
            {
                MusicSource.Pause();
                PlayerPrefs.SetInt("Music", 0);
            }


        }
    }

    public bool IsSoundOn
    {
        get
        {
            return _isSoundOn;
        }

        set
        {
            _isSoundOn = value;

            if (_isSoundOn)
            {
                if (_isPlayingAmbiental)
                {
                    AmbientalSource.Play();
                }
                PlayerPrefs.SetInt("Sound", 1);
            }
            else
            {
                AmbientalSource.Stop();
                PlayerPrefs.SetInt("Sound", 0);
            }
        }
    }

    public bool IsPlayingMusic
    {
        get
        {
            return _isPlayingMusic;
        }
    }

    public bool IsPlayingAmbiental
    {
        get
        {
            return _isPlayingAmbiental;
        }
    }

    protected AudioSource MusicSource
    {
        get
        {
            return _musicSource;
        }
    }

    protected AudioSource AmbientalSource
    {
        get
        {
            return _ambientalSource;
        }
    }

    protected AudioSource FxSoundsSource
    {
        get
        {
            return _fxSoundsSource;
        }
    }

    protected AudioSource UiSoundsSource
    {
        get
        {
            return _uiSoundsSource;
        }
    }

    #endregion

    #region MonoBehaviour Methods

     protected override void Awake()
    {
        base.Awake();

        _musicSource = gameObject.AddComponent<AudioSource>();
        _musicSource.loop = true;

        _ambientalSource = gameObject.AddComponent<AudioSource>();
        _ambientalSource.loop = true;

        _fxSoundsSource = gameObject.AddComponent<AudioSource>();
        _fxSoundsSource.loop = false;

        _uiSoundsSource = gameObject.AddComponent<AudioSource>();

        IsMusicOn = PlayerPrefs.GetInt("Music", 1) == 1;
        IsSoundOn = PlayerPrefs.GetInt("Sound", 1) == 1;
    }
    #endregion

    #region Public Methods

    public void SwitchSound()
    {
        IsSoundOn = !_isSoundOn;
    }

    public void SwitchMusic()
    {
        IsMusicOn = !_isMusicOn;
    }

    public void PlayMusic(AudioClip music)
    {
        _isPlayingMusic = true;

        if (_isMusicOn)
        {
            //if (MusicSource.isPlaying)
            //{
            //    MusicSource.Stop();
            //}
            if(MusicSource.clip != music)
            {
                MusicSource.clip = music;
                MusicSource.Play();
            }
        }
        else
        {
            MusicSource.clip = music;
        }
        //TODO: transitions?
    }

    public void StopMusic()
    {
        _isPlayingMusic = false;
        MusicSource.Stop();
    }

    public void SetMusicVolume(float volume)
    {
        MusicSource.volume = volume;
    }

    public void FadeMusic(float endVolume, float time, TweenCallback onComplete = null)
    {
        if (onComplete == null)
        {
            MusicSource.DOFade(endVolume, time);
        }
        else
        {
            MusicSource.DOFade(endVolume, time).OnComplete(onComplete);
        }
    }

    public void FadeMusic(float startVolume, float endVolume, float time, TweenCallback onComplete = null)
    {
        MusicSource.volume = startVolume;
        if (onComplete == null)
        {
            MusicSource.DOFade(endVolume, time);
        }
        else
        {
            MusicSource.DOFade(endVolume, time).OnComplete(onComplete);
        }
    }

    public void PlayAmbiental(AudioClip ambiental)
    {
        _isPlayingAmbiental = true;

        if (_isSoundOn)
        {
            //if (_ambientalSource.isPlaying)
            //{
            //    AmbientalSource.Stop();
            //}
            AmbientalSource.clip = ambiental;
            AmbientalSource.Play();
        }
        else
        {
            AmbientalSource.clip = ambiental;
        }
        //TODO: transitions?
    }

    public void StopAmbiental()
    {
        _isPlayingAmbiental = false;
        AmbientalSource.Stop();
    }

    public void SetAmbientalVolume(float volume)
    {
        AmbientalSource.volume = volume;
    }

    public void FadeAmbiental(float endVolume, float time, TweenCallback onComplete = null)
    {
        if (onComplete == null)
        {
            AmbientalSource.DOFade(endVolume, time);
        }
        else
        {
            AmbientalSource.DOFade(endVolume, time).OnComplete(onComplete);
        }
    }

    public void FadeAmbiental(float startVolume, float endVolume, float time, TweenCallback onComplete = null)
    {
        AmbientalSource.volume = startVolume;
        if (onComplete == null)
        {
            AmbientalSource.DOFade(endVolume, time);
        }
        else
        {
            AmbientalSource.DOFade(endVolume, time).OnComplete(onComplete);
        }
    }

    public void PlayFxSound(AudioClip sound)
    {
        if (_isSoundOn)
        {
            //if (FxSoundsSource.isPlaying)
            //{
            //    FxSoundsSource.Stop();
            //}
            FxSoundsSource.clip = sound;
            FxSoundsSource.Play();
        }
    }

    public void PlayUiSound(AudioClip sound)
    {
        if (_isSoundOn)
        {
            //if (UiSoundsSource.isPlaying)
            //{
            //    UiSoundsSource.Stop();
            //}
            UiSoundsSource.clip = sound;
            UiSoundsSource.Play();
        }
    }

    public void PlayButtonSound()
    {
        PlayUiSound(_buttonSound);
    }

    public void PlayDefeatSound()
    {
        PlayFxSound(_defeatSound);
    }

    public void PlayNewLevelSound()
    {
        PlayFxSound(_newLevelSound);
    }

    public void PlayBounceSound()
    {
        PlayFxSound(_bounceSound);
    }

    public void PlayShotSound()
    {
        PlayFxSound(_shotSound);
    }

    public void PlayGameMusic()
    {
        PlayMusic(_gameMusic);
    }

    public void PlayMenuMusic()
    {
        PlayMusic(_menuMusic);
    }

    #endregion
}

