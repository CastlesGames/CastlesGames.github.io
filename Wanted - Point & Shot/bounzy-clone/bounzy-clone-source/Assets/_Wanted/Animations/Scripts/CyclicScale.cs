using MovementEffects;
using DG.Tweening;
using UnityEngine;

public class CyclicScale : MonoBehaviour
{
    [SerializeField]
    Vector3 _rescale;

    [SerializeField]
    bool _inverseLoop = true;

    [SerializeField]
    float _duration;

    [SerializeField]
    float _inverseDuration;

    [SerializeField]
    bool _playOnEnable = true;

    [SerializeField]
    int _repeat = 0;

    [SerializeField]
    float _delay = 0;

    [SerializeField]
    float _inverseDelay = 0;

    [SerializeField]
    float _sleep = 0;

    [SerializeField]
    bool _isolatedCurves = false;

    [SerializeField]
    Ease _curve = Ease.InOutSine;

    [SerializeField]
    Ease _inverseCurve = Ease.InOutSine;

    [SerializeField]
    Ease _xCurve = Ease.InOutSine;

    [SerializeField]
    Ease _yCurve = Ease.InOutSine;

    [SerializeField]
    Ease _zCurve = Ease.InOutSine;

    [SerializeField]
    Ease _inverseXCurve = Ease.InOutSine;

    [SerializeField]
    Ease _inverseYCurve = Ease.InOutSine;

    [SerializeField]
    Ease _inverseZCurve = Ease.InOutSine;

#if UNITY_EDITOR
    private bool RescaleInvalid()
    {
        return _rescale == Vector3.zero;
    }

    private bool DurationInvalid()
    {
        return _duration <= 0;
    }

    private bool InverseDurationInvalid()
    {
        return _inverseDuration <= 0;
    }

    private bool NotIsolated()
    {
        return !_isolatedCurves;
    }

    private bool NotIsolatedInverse()
    {
        return !_isolatedCurves && _inverseLoop;
    }

    private bool IsolatedMoveX()
    {
        return _isolatedCurves && _rescale.x != 0;
    }

    private bool IsolatedMoveY()
    {
        return _isolatedCurves && _rescale.y != 0;
    }

    private bool IsolatedMoveZ()
    {
        return _isolatedCurves && _rescale.z != 0;
    }

    private bool IsolatedInverseMoveX()
    {
        return _inverseLoop && IsolatedMoveX();
    }

    private bool IsolatedInverseMoveY()
    {
        return _inverseLoop && IsolatedMoveY();
    }

    private bool IsolatedInverseMoveZ()
    {
        return _inverseLoop && IsolatedMoveZ();
    }
#endif

    private CoroutineHandle _handler;
    private Tweener _xTweener = null;
    private Tweener _yTweener = null;
    private Tweener _zTweener = null;

    private Vector3 _startScale;

    private int _repetitions = 0;

    public Vector3 Rescale
    {
        get
        {
            return _rescale;
        }
    }

    public float Duration
    {
        get
        {
            return _duration;
        }
    }

    void OnEnable()
    {
        _startScale = transform.localScale;
        if (_playOnEnable)
        {
            Play();
        }
    }

    void OnDisable()
    {
        transform.localScale = _startScale;
        Stop();
    }

    public void Play()
    {
        if (_delay > 0)
        {
            Timing.CallDelayed(_delay, Scale);
        }
        else
        {
            Scale();
        }
    }

    public void Stop()
    {
        Timing.KillCoroutines(_handler);
        if (_xTweener != null)
        {
            _xTweener.Kill();
            _xTweener = null;
        }
        if (_yTweener != null)
        {
            _yTweener.Kill();
            _yTweener = null;
        }
        if (_zTweener != null)
        {
            _zTweener.Kill();
            _zTweener = null;
        }
    }

    void Scale()
    {
        Scale(false);
    }

    void Scale(bool inverse)
    {
        Vector3 endScale;
        float duration;
        Ease curve = Ease.InOutSine;
        Ease xCurve = Ease.InOutSine;
        Ease yCurve = Ease.InOutSine;
        Ease zCurve = Ease.InOutSine;
        if (inverse)
        {
            endScale = _startScale;
            duration = _inverseDuration;
            if (_isolatedCurves)
            {
                xCurve = _inverseXCurve;
                yCurve = _inverseYCurve;
                zCurve = _inverseZCurve;
            }
            else
            {
                curve = _curve;
            }

        }
        else
        {
            endScale = transform.localScale + _rescale;
            duration = _duration;
            if (_isolatedCurves)
            {
                xCurve = _xCurve;
                yCurve = _yCurve;
                zCurve = _zCurve;
            }
            else
            {
                curve = _inverseCurve;
            }
        }

        if (_isolatedCurves)
        {
            if (_rescale.x != 0)
            {
                _xTweener = transform.DOScaleX(endScale.x, duration).SetEase(xCurve);
            }
            if (_rescale.y != 0)
            {
                _yTweener = transform.DOScaleY(endScale.y, duration).SetEase(yCurve);
            }
            if (_rescale.z != 0)
            {
                _zTweener = transform.DOScaleZ(endScale.z, duration).SetEase(zCurve);
            }
        }
        else
        {
            _xTweener = transform.DOScale(endScale, duration).SetEase(curve);
        }

        _handler = Timing.CallDelayed(duration + _sleep, () => {
            if (_repeat > 0 && inverse == _inverseLoop)
            {
                ++_repetitions;
                if (_repetitions >= _repeat)
                {
                    Stop();
                    return;
                }
            }

            if (_inverseLoop)
            {
                if (inverse && _delay > 0)
                {
                    Timing.CallDelayed(_delay, Scale);
                }
                else if (!inverse && _inverseDelay > 0)
                {
                    Timing.CallDelayed(_inverseDelay, Scale);
                }
                else
                {
                    Scale(!inverse);
                }
            }
            else
            {
                transform.localScale = _startScale;
                if (_delay > 0)
                {
                    Timing.CallDelayed(_delay, Scale);
                }
                else
                {
                    Scale();
                }
            }
        });
    }
}

