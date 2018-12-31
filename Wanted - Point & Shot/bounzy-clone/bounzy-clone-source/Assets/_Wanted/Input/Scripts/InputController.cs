using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputController : MonoBehaviour
{
    public event System.Action<Vector3> OnHoldUp;
    public event System.Action<Vector3> OnHold;

    void Start()
    {
        
    }

    void Update()
    {
        if (Input.GetMouseButton(0))
        {
            if (OnHold != null) OnHold(PointDirection());
        }

        if (Input.GetMouseButtonUp(0))
        {
            if(Camera.main.ScreenToWorldPoint(Input.mousePosition).y < 3.1f){
                if (OnHoldUp != null) OnHoldUp(PointDirection());
            }
        }
    }

    Vector3 PointDirection ()
    {
        Vector3 direction = Camera.main.ScreenToWorldPoint(Input.mousePosition) - transform.position;
        direction.z = 0;
        direction.Normalize();

        return direction;
    }  

    string DebugVectorToString(Vector3 vector)
    {
        vector.Normalize();
        string charset = "( " + vector.x + " ," + vector.y + " ," + vector.z + " )";
        return charset;
    }
}
