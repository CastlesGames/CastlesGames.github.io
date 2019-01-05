using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class BetterBehaviour : MonoBehaviour
{

    Transform _transform = null;
    RectTransform _rectTransform = null;

    /// <summary>
    /// Cached Transform (property «MonoBehaviour.transform» always calls to GetComponent<Transform>(), instead of keep result in memory, so this is a more optimized property).
    /// </summary>
    public Transform Transform
    {
        get
        {
            if (_transform == null)
            {
                if (_rectTransform != null)
                {
                    _transform = _rectTransform;
                }
                else
                {
                    _transform = transform;
                }
            }
            return _transform;
        }
    }

    public RectTransform RectTransform
    {
        get
        {
            if (_rectTransform == null)
            {
                if (_transform != null)
                {
                    _rectTransform = (RectTransform)_transform;
                }
                else
                {
                    _rectTransform = GetComponent<RectTransform>();
                }
            }
            return _rectTransform;
        }
    }

    //public static void CallDelayed(float time, System.Action method)
    //{
    //    System.Threading.Thread thread = new System.Threading.Thread(
    //        new System.Threading.ThreadStart(() =>
    //        {
    //            System.Threading.Thread.Sleep((int)(time * 1000));
    //            method();
    //        }));
    //}
}
